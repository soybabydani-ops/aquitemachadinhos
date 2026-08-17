// ============================================================
// AQUITEM — High-Performance Supabase Singleton Client
// Node.js nativo (Zero Overhead / Connection Reuse)
// ============================================================

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://efvuzxdhsirpvxclgdfg.supabase.co';
const SUPABASE_ANON = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc';
const SUPABASE_SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || SUPABASE_ANON;

/**
 * Cliente PostgREST ultraleve com Keep-Alive reutilizável
 */
class SupabaseClient {
  constructor(url, key, isService = false) {
    this.url = url.replace(/\/+$/, '');
    this.key = key;
    this.isService = isService;
  }

  async query(endpoint, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body = null,
      timeout = 8000,
      prefer = null
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const reqHeaders = {
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`,
      'Accept': 'application/json',
      ...headers
    };

    if (body) {
      reqHeaders['Content-Type'] = 'application/json';
    }

    if (prefer) {
      reqHeaders['Prefer'] = prefer;
    }

    try {
      const resp = await fetch(`${this.url}/rest/v1/${endpoint}`, {
        method,
        headers: reqHeaders,
        body: body ? JSON.stringify(body) : null,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const status = resp.status;
      const contentRange = resp.headers.get('content-range');
      let data = null;

      if (status !== 204 && resp.headers.get('content-type')?.includes('application/json')) {
        data = await resp.json();
      }

      return {
        data,
        status,
        ok: resp.ok,
        count: contentRange ? parseContentRange(contentRange) : (Array.isArray(data) ? data.length : null)
      };
    } catch (err) {
      clearTimeout(timeoutId);
      console.error(`[SupabaseClient Error] ${endpoint}:`, err.message);
      return { data: null, status: 500, ok: false, error: err.message };
    }
  }

  from(table) {
    return new PostgrestBuilder(this, table);
  }
}

class PostgrestBuilder {
  constructor(client, table) {
    this.client = client;
    this.table = table;
    this.params = [];
    this.headers = {};
    this.prefer = [];
  }

  select(columns = '*', options = {}) {
    this.params.push(`select=${encodeURIComponent(columns)}`);
    if (options.count === 'exact') {
      this.prefer.push('count=exact');
    }
    return this;
  }

  eq(column, value) {
    this.params.push(`${encodeURIComponent(column)}=eq.${encodeURIComponent(value)}`);
    return this;
  }

  neq(column, value) {
    this.params.push(`${encodeURIComponent(column)}=neq.${encodeURIComponent(value)}`);
    return this;
  }

  ilike(column, pattern) {
    this.params.push(`${encodeURIComponent(column)}=ilike.${encodeURIComponent(pattern)}`);
    return this;
  }

  in(column, values) {
    const list = values.map(v => `"${v}"`).join(',');
    this.params.push(`${encodeURIComponent(column)}=in.(${encodeURIComponent(list)})`);
    return this;
  }

  order(column, options = {}) {
    const dir = options.ascending ? 'asc' : 'desc';
    const nulls = options.nullsFirst ? '.nullsfirst' : '.nullslast';
    this.params.push(`order=${encodeURIComponent(column)}.${dir}${nulls}`);
    return this;
  }

  limit(count) {
    this.params.push(`limit=${parseInt(count, 10)}`);
    return this;
  }

  range(from, to) {
    this.headers['Range'] = `${from}-${to}`;
    return this;
  }

  async execute() {
    const queryStr = this.params.length > 0 ? `?${this.params.join('&')}` : '';
    const preferHeader = this.prefer.length > 0 ? this.prefer.join(',') : null;
    return this.client.query(`${this.table}${queryStr}`, {
      method: 'GET',
      headers: this.headers,
      prefer: preferHeader
    });
  }

  async insert(data) {
    return this.client.query(this.table, {
      method: 'POST',
      body: data,
      prefer: 'return=representation'
    });
  }

  async update(data) {
    const queryStr = this.params.length > 0 ? `?${this.params.join('&')}` : '';
    return this.client.query(`${this.table}${queryStr}`, {
      method: 'PATCH',
      body: data,
      prefer: 'return=representation'
    });
  }
}

function parseContentRange(rangeStr) {
  const parts = rangeStr.split('/');
  if (parts.length > 1 && parts[1] !== '*') {
    return parseInt(parts[1], 10);
  }
  return null;
}

// Singleton instances
const supabaseAnon = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON, false);
const supabaseAdmin = new SupabaseClient(SUPABASE_URL, SUPABASE_SERVICE, true);

module.exports = {
  supabase: supabaseAnon,
  supabaseAdmin,
  SUPABASE_URL,
  SUPABASE_ANON,
  SUPABASE_SERVICE
};
