/**
 * ============================================================================
 * Gumroad Product Management Dashboard — app.js
 * ============================================================================
 *
 * A fully self-contained, framework-free dashboard that connects to the
 * Gumroad API (v2) and falls back to rich mock data when no API token is set.
 *
 * Architecture
 * ────────────
 *  1. GumroadAPI   – thin HTTP wrapper around api.gumroad.com/v2
 *  2. MockData     – realistic seed data for offline / demo mode
 *  3. Store        – simple reactive state with subscriber notifications
 *  4. Router       – hash-based SPA router
 *  5. Charts       – canvas-based area & bar charts (no dependencies)
 *  6. UI Utilities – formatCurrency, formatDate, toasts, modals, skeletons …
 *  7. Views        – Dashboard, Products, Sales, Analytics, Settings
 *  8. App          – bootstrap / init
 *
 * CSS class names used here match the stylesheet contract listed in the brief.
 * ============================================================================
 */

/* ═══════════════════════════════════════════════════════════════════════════
   1. GUMROAD API LAYER
   ═══════════════════════════════════════════════════════════════════════════ */

const GumroadAPI = {
  baseUrl: 'https://api.gumroad.com/v2',
  accessToken: localStorage.getItem('gumroad_access_token') || '',

  /**
   * Generic authenticated request helper.
   * Automatically appends the access_token query param.
   */
  async request(endpoint, options = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.set('access_token', this.accessToken);

    // Merge any extra query params
    if (options.params) {
      Object.entries(options.params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          url.searchParams.set(k, v);
        }
      });
    }

    const fetchOpts = {
      method: options.method || 'GET',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    };

    if (options.body) {
      fetchOpts.body = JSON.stringify(options.body);
    }

    try {
      const res = await fetch(url.toString(), fetchOpts);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.error(`[GumroadAPI] ${endpoint}:`, err);
      throw err;
    }
  },

  /** Fetch all products for the authenticated user. */
  async getProducts() {
    const data = await this.request('/products');
    return data.products || [];
  },

  /** Fetch a single product by ID. */
  async getProduct(id) {
    const data = await this.request(`/products/${id}`);
    return data.product || null;
  },

  /** Fetch sales list. Params: after, before, page, product_id. */
  async getSales(params = {}) {
    const data = await this.request('/sales', { params });
    return data;
  },

  /** Fetch subscribers for a specific product. */
  async getSubscribers(productId) {
    const data = await this.request(`/products/${productId}/subscribers`);
    return data.subscribers || [];
  },

  /**
   * Quick "ping" to verify the token works.
   * Uses the /user endpoint which is lightweight.
   */
  async testConnection() {
    const data = await this.request('/user');
    return data.user || null;
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   2. MOCK DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const MockData = (() => {
  // ─── helpers ───────────────────────────────────────────────────────────
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[rand(0, arr.length - 1)];

  const firstNames = [
    'Emma', 'Liam', 'Sophia', 'Noah', 'Olivia', 'James', 'Ava', 'Lucas',
    'Mia', 'Ethan', 'Isabella', 'Mason', 'Charlotte', 'Logan', 'Amelia',
    'Alexander', 'Harper', 'Benjamin', 'Evelyn', 'William',
  ];
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
    'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
    'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  ];
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'hey.com', 'proton.me'];

  const randomEmail = () => {
    const f = pick(firstNames).toLowerCase();
    const l = pick(lastNames).toLowerCase();
    return `${f}.${l}${rand(1, 99)}@${pick(domains)}`;
  };

  const countries = [
    { code: 'US', name: 'United States', weight: 35 },
    { code: 'GB', name: 'United Kingdom', weight: 12 },
    { code: 'CA', name: 'Canada', weight: 9 },
    { code: 'DE', name: 'Germany', weight: 7 },
    { code: 'AU', name: 'Australia', weight: 6 },
    { code: 'FR', name: 'France', weight: 5 },
    { code: 'IN', name: 'India', weight: 8 },
    { code: 'BR', name: 'Brazil', weight: 4 },
    { code: 'NL', name: 'Netherlands', weight: 3 },
    { code: 'JP', name: 'Japan', weight: 3 },
    { code: 'SE', name: 'Sweden', weight: 2 },
    { code: 'ES', name: 'Spain', weight: 2 },
    { code: 'IT', name: 'Italy', weight: 2 },
    { code: 'NG', name: 'Nigeria', weight: 2 },
  ];

  const weightedCountry = () => {
    const total = countries.reduce((s, c) => s + c.weight, 0);
    let r = Math.random() * total;
    for (const c of countries) {
      r -= c.weight;
      if (r <= 0) return c;
    }
    return countries[0];
  };

  // ─── products ──────────────────────────────────────────────────────────
  const products = [
    {
      id: 'trustworthy-ai-business-playbook',
      name: 'Trustworthy AI Business Playbook: XAI, Fraud Detection & Automation Systems',
      description: 'A practical, jargon-free guide that teaches buyers how to build trustworthy AI systems using explainability (XAI), fraud detection, and business automation concepts.',
      price: 1000,
      formatted_price: '$10',
      currency: 'usd',
      sales_count: 320,
      sales_usd_cents: 320 * 1000,
      thumbnail_url: '',
      preview_url: 'https://arunkg7.gumroad.com/l/fhqklp',
      short_url: 'https://arunkg7.gumroad.com/l/fhqklp',
      published: true,
      status: 'published',
      tags: ['guide', 'xai', 'automation'],
      created_at: '2025-10-15T08:00:00Z',
      updated_at: '2026-05-25T10:00:00Z',
    },
    {
      id: 'fraud-detection-xai-project-kit',
      name: 'Fraud Detection XAI Project Kit: Python, SHAP, Dataset & Deployment Guide',
      description: 'A complete, hands-on project kit for building a fraud detection system with explainable AI. Includes Python code, SHAP visualizations, a sample dataset, and a step-by-step deployment guide.',
      price: 9900,
      formatted_price: '$99',
      currency: 'usd',
      sales_count: 54,
      sales_usd_cents: 54 * 9900,
      thumbnail_url: '',
      preview_url: 'https://arunkg7.gumroad.com/l/ihsob',
      short_url: 'https://arunkg7.gumroad.com/l/ihsob',
      published: true,
      status: 'published',
      tags: ['project-kit', 'python', 'xai'],
      created_at: '2025-11-20T10:00:00Z',
      updated_at: '2026-05-25T11:00:00Z',
    },
    {
      id: 'firebase-saas-starter-kit',
      name: 'Lead.AI Indie AI SaaS Starter Kit — Auth, Dashboard, Stripe, Gumroad & Launch Pages',
      description: 'A practical, high-converting SaaS starter kit specifically tailored for AI builders, founders, and indie hackers. Includes robust Firebase authentication, modern landing pages, Stripe & Gumroad payments, creator dashboards, and legal templates.',
      price: 4900,
      formatted_price: '$49',
      currency: 'usd',
      sales_count: 142,
      sales_usd_cents: 142 * 4900,
      thumbnail_url: '',
      preview_url: 'https://arunkg7.gumroad.com/l/efqpmz',
      short_url: 'https://arunkg7.gumroad.com/l/efqpmz',
      published: true,
      status: 'published',
      tags: ['software', 'saas', 'firebase'],
      created_at: '2025-12-05T09:00:00Z',
      updated_at: '2026-05-25T12:00:00Z',
    },
    {
      id: 'ai-automation-prompt-vault',
      name: '50 AI Automation Prompts for Small Businesses, Chatbots, Leads & SaaS Builders',
      description: '50 production-ready AI automation prompts organized by use case: customer service, lead generation, chatbot scripts, SaaS onboarding, content creation, and sales automation.',
      price: 1900,
      formatted_price: '$19',
      currency: 'usd',
      sales_count: 480,
      sales_usd_cents: 480 * 1900,
      thumbnail_url: '',
      preview_url: 'https://arunkg7.gumroad.com/l/tqnpq',
      short_url: 'https://arunkg7.gumroad.com/l/tqnpq',
      published: true,
      status: 'published',
      tags: ['prompt-pack', 'automation', 'chatbots'],
      created_at: '2025-09-01T14:00:00Z',
      updated_at: '2026-05-25T13:00:00Z',
    },
    {
      id: 'ai-client-acquisition-command-center',
      name: 'Lead.AI Client Acquisition Command Center — Find & Pitch AI Automation Clients',
      description: 'Find local businesses, audit AI opportunities, write personalized outreach, and pitch simple AI automation projects with confidence. Includes outreach templates, worksheets, and a diagnostic CRM.',
      price: 2900,
      formatted_price: '$29',
      currency: 'usd',
      sales_count: 98,
      sales_usd_cents: 98 * 2900,
      thumbnail_url: '',
      preview_url: 'https://arunkg7.gumroad.com/l/client-acquisition-center',
      short_url: 'https://arunkg7.gumroad.com/l/client-acquisition-center',
      published: true,
      status: 'published',
      tags: ['playbook', 'freelancing', 'client-acquisition'],
      created_at: '2026-05-01T11:00:00Z',
      updated_at: '2026-06-01T09:00:00Z',
    },
    {
      id: 'lead-ai-bundle',
      name: 'Lead.AI Business Automation & XAI Builder Bundle',
      description: 'The complete Lead.AI business suite. Contains the Trustworthy AI Playbook, Fraud Detection XAI Kit, Firebase SaaS Starter Kit, and 50 AI Automation Prompts at a 47% discount.',
      price: 7900,
      formatted_price: '$79',
      currency: 'usd',
      sales_count: 36,
      sales_usd_cents: 36 * 7900,
      thumbnail_url: '',
      preview_url: 'https://github.com/Arungharami/Lead-ai-gumroad-products',
      short_url: 'https://github.com/Arungharami/Lead-ai-gumroad-products',
      published: false,
      status: 'draft',
      tags: ['bundle', 'automation', 'xai'],
      created_at: '2026-05-15T12:00:00Z',
      updated_at: '2026-06-01T10:00:00Z',
    },
    {
      id: 'free-ai-product-launch-checklist',
      name: 'Free Lead.AI AI Product Launch Checklist',
      description: 'A practical, step-by-step checklist for launching your first AI product — covering validation, tooling, packaging, pricing, and go-to-market.',
      price: 0,
      formatted_price: 'Free',
      currency: 'usd',
      sales_count: 1250,
      sales_usd_cents: 0,
      thumbnail_url: '',
      preview_url: 'https://github.com/Arungharami/Lead-ai-gumroad-products',
      short_url: 'https://github.com/Arungharami/Lead-ai-gumroad-products',
      published: false,
      status: 'draft',
      tags: ['checklist', 'freebie', 'launch'],
      created_at: '2026-05-10T10:00:00Z',
      updated_at: '2026-06-01T11:00:00Z',
    },
  ];

  // ─── sales ─────────────────────────────────────────────────────────────
  const generateSales = () => {
    const sales = [];
    const statuses = ['completed', 'completed', 'completed', 'completed', 'refunded', 'disputed', 'completed', 'completed'];
    const now = Date.now();

    // We want ~60 sales spread over the last 6 months
    for (let i = 0; i < 65; i++) {
      const product = pick(products.filter((p) => p.published));
      const daysAgo = rand(0, 180);
      const saleDate = new Date(now - daysAgo * 86400000);
      saleDate.setHours(rand(6, 23), rand(0, 59), rand(0, 59));
      const country = weightedCountry();

      sales.push({
        id: `sale_${String(i + 1).padStart(4, '0')}`,
        email: randomEmail(),
        product_id: product.id,
        product_name: product.name,
        product_permalink: product.short_url,
        price: product.price,
        formatted_price: product.formatted_price,
        currency: 'usd',
        quantity: 1,
        timestamp: saleDate.toISOString(),
        created_at: saleDate.toISOString(),
        order_number: rand(100000, 999999),
        status: pick(statuses),
        country: country.code,
        country_name: country.name,
        referrer: pick(['', 'twitter.com', 'google.com', 'youtube.com', 'linkedin.com', '']),
        is_gift: Math.random() < 0.05,
        refunded: false,
        discover_fee_charged: Math.random() < 0.3,
      });
    }

    // Sort newest first
    sales.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sales;
  };

  const sales = generateSales();

  // ─── monthly revenue data (last 6 months) ──────────────────────────────
  const generateRevenueData = () => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      // Base revenue + growth trend + noise
      const base = 3000 + (5 - i) * 800;
      const noise = rand(-400, 600);
      months.push({ label, value: Math.max(0, base + noise) });
    }
    return months;
  };

  const revenueOverTime = generateRevenueData();

  return { products, sales, revenueOverTime, countries, weightedCountry };
})();

/* ═══════════════════════════════════════════════════════════════════════════
   3. REACTIVE STATE STORE
   ═══════════════════════════════════════════════════════════════════════════ */

const Store = (() => {
  /** Internal state tree. */
  const _state = {
    // Data
    products: [],
    sales: [],
    revenueOverTime: [],

    // Dashboard stats
    stats: {
      totalRevenue: 0,
      totalSales: 0,
      activeProducts: 0,
      monthRevenue: 0,
    },

    // UI state
    currentView: 'dashboard',
    isLoading: false,
    searchQuery: '',
    productFilter: '',
    productSort: { key: 'sales_count', dir: 'desc' },
    salesPage: 1,
    salesPerPage: 15,
    salesFilters: { product: '', status: '', dateFrom: '', dateTo: '' },

    // Settings
    useMockData: !localStorage.getItem('gumroad_access_token'),
    theme: localStorage.getItem('theme') || 'dark',
    notifications: JSON.parse(localStorage.getItem('notifications') || '{"sales":true,"weekly":true}'),
  };

  /** Subscribers keyed by state path (or '*' for any change). */
  const _subs = {};

  /** Notify subscribers whose key matches the changed path. */
  const _notify = (path) => {
    (_subs[path] || []).forEach((fn) => fn(_state));
    (_subs['*'] || []).forEach((fn) => fn(_state));
  };

  return {
    /** Read a value from state. Dot-path supported (e.g. 'stats.totalRevenue'). */
    get(path) {
      return path.split('.').reduce((o, k) => (o ? o[k] : undefined), _state);
    },

    /** Update state and notify listeners. */
    set(path, value) {
      const keys = path.split('.');
      let target = _state;
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      _notify(path);
    },

    /** Subscribe to changes. Returns unsubscribe function. */
    on(path, fn) {
      if (!_subs[path]) _subs[path] = [];
      _subs[path].push(fn);
      return () => {
        _subs[path] = _subs[path].filter((f) => f !== fn);
      };
    },

    /** Read the full state (shallow copy). */
    getAll() {
      return { ..._state };
    },

    /** Compute aggregate dashboard stats from current products & sales. */
    computeStats() {
      const products = _state.products;
      const sales = _state.sales;
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const totalRevenue = products.reduce((s, p) => s + (p.sales_usd_cents || 0), 0);
      const totalSales = products.reduce((s, p) => s + (p.sales_count || 0), 0);
      const activeProducts = products.filter((p) => p.published || p.status === 'published').length;
      const monthRevenue = sales
        .filter((s) => new Date(s.timestamp) >= startOfMonth && s.status === 'completed')
        .reduce((s, sale) => s + sale.price, 0);

      _state.stats = { totalRevenue, totalSales, activeProducts, monthRevenue };
      _notify('stats');
    },
  };
})();

/* ═══════════════════════════════════════════════════════════════════════════
   4. HASH-BASED ROUTER
   ═══════════════════════════════════════════════════════════════════════════ */

const Router = (() => {
  const routes = ['dashboard', 'products', 'sales', 'analytics', 'settings'];

  const navigate = (view) => {
    if (!routes.includes(view)) view = 'dashboard';
    window.location.hash = `#${view}`;
  };

  const getCurrentRoute = () => {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    return routes.includes(hash) ? hash : 'dashboard';
  };

  const init = () => {
    const render = () => {
      const view = getCurrentRoute();
      Store.set('currentView', view);
      updateNav(view);
      renderView(view);
    };

    window.addEventListener('hashchange', render);
    render(); // initial
  };

  const updateNav = (view) => {
    document.querySelectorAll('.nav-item').forEach((el) => {
      el.classList.toggle('active', el.dataset.view === view);
    });
  };

  return { navigate, getCurrentRoute, init };
})();

/* ═══════════════════════════════════════════════════════════════════════════
   5. CANVAS CHART RENDERERS
   ═══════════════════════════════════════════════════════════════════════════ */

const Charts = (() => {
  // Colour palette (matches the CSS custom properties)
  const palette = {
    primary: '#6C5CE7',
    primaryLight: '#a29bfe',
    secondary: '#00cec9',
    accent: '#fd79a8',
    success: '#00b894',
    warning: '#fdcb6e',
    danger: '#d63031',
    gridLine: 'rgba(255,255,255,0.06)',
    gridText: 'rgba(255,255,255,0.4)',
    gradientTop: 'rgba(108,92,231,0.45)',
    gradientBottom: 'rgba(108,92,231,0.0)',
    barColors: [
      '#6C5CE7', '#00cec9', '#fd79a8', '#fdcb6e',
      '#00b894', '#e17055', '#74b9ff', '#a29bfe',
      '#55efc4', '#fab1a0',
    ],
  };

  /**
   * Draw smooth area / line chart on a <canvas>.
   * data: [{ label, value }]
   */
  const drawAreaChart = (canvas, data, options = {}) => {
    if (!canvas || !data || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const padTop = 30;
    const padBottom = 40;
    const padLeft = 55;
    const padRight = 20;
    const chartW = W - padLeft - padRight;
    const chartH = H - padTop - padBottom;

    const maxVal = Math.max(...data.map((d) => d.value)) * 1.15 || 1;
    const minVal = 0;

    const xStep = data.length > 1 ? chartW / (data.length - 1) : chartW;
    const yScale = (v) => padTop + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
    const xPos = (i) => padLeft + i * xStep;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Grid lines (horizontal)
    const gridCount = 5;
    ctx.strokeStyle = palette.gridLine;
    ctx.lineWidth = 1;
    ctx.font = '11px Inter, system-ui, sans-serif';
    ctx.fillStyle = palette.gridText;
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridCount; i++) {
      const val = minVal + ((maxVal - minVal) / gridCount) * i;
      const y = yScale(val);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(W - padRight, y);
      ctx.stroke();
      ctx.fillText(formatCurrency(val, true), padLeft - 8, y + 4);
    }

    // X labels
    ctx.textAlign = 'center';
    ctx.fillStyle = palette.gridText;
    data.forEach((d, i) => {
      ctx.fillText(d.label, xPos(i), H - 10);
    });

    // Build points
    const points = data.map((d, i) => ({ x: xPos(i), y: yScale(d.value) }));

    // Helper: bezier control points for smooth curves
    const bezierCPs = (pts) => {
      const cps = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const tension = 0.3;
        cps.push({
          cp1x: p1.x + (p2.x - p0.x) * tension,
          cp1y: p1.y + (p2.y - p0.y) * tension,
          cp2x: p2.x - (p3.x - p1.x) * tension,
          cp2y: p2.y - (p3.y - p1.y) * tension,
        });
      }
      return cps;
    };

    const cps = bezierCPs(points);

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
    gradient.addColorStop(0, options.gradientTop || palette.gradientTop);
    gradient.addColorStop(1, options.gradientBottom || palette.gradientBottom);

    ctx.beginPath();
    ctx.moveTo(points[0].x, padTop + chartH); // baseline
    ctx.lineTo(points[0].x, points[0].y);
    for (let i = 0; i < cps.length; i++) {
      ctx.bezierCurveTo(cps[i].cp1x, cps[i].cp1y, cps[i].cp2x, cps[i].cp2y, points[i + 1].x, points[i + 1].y);
    }
    ctx.lineTo(points[points.length - 1].x, padTop + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < cps.length; i++) {
      ctx.bezierCurveTo(cps[i].cp1x, cps[i].cp1y, cps[i].cp2x, cps[i].cp2y, points[i + 1].x, points[i + 1].y);
    }
    ctx.strokeStyle = options.lineColor || palette.primary;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Dots
    points.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = options.lineColor || palette.primary;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a2e';
      ctx.fill();
    });
  };

  /**
   * Draw horizontal bar chart.
   * data: [{ label, value }]
   */
  const drawBarChart = (canvas, data, options = {}) => {
    if (!canvas || !data || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = rect.height;
    const padLeft = 140;
    const padRight = 60;
    const padTop = 15;
    const padBottom = 15;
    const barHeight = Math.min(28, (H - padTop - padBottom) / data.length - 8);
    const gap = 8;
    const maxVal = Math.max(...data.map((d) => d.value)) || 1;

    ctx.clearRect(0, 0, W, H);

    data.forEach((d, i) => {
      const y = padTop + i * (barHeight + gap);
      const barW = ((d.value / maxVal) * (W - padLeft - padRight));

      // Bar gradient
      const grad = ctx.createLinearGradient(padLeft, 0, padLeft + barW, 0);
      const color = palette.barColors[i % palette.barColors.length];
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '88');

      // Bar background track
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      roundRect(ctx, padLeft, y, W - padLeft - padRight, barHeight, 4);
      ctx.fill();

      // Bar
      ctx.fillStyle = grad;
      roundRect(ctx, padLeft, y, Math.max(barW, 4), barHeight, 4);
      ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      const labelText = d.label.length > 20 ? d.label.substring(0, 18) + '…' : d.label;
      ctx.fillText(labelText, padLeft - 10, y + barHeight / 2 + 4);

      // Value
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.textAlign = 'left';
      ctx.fillText(options.formatValue ? options.formatValue(d.value) : d.value, padLeft + barW + 8, y + barHeight / 2 + 4);
    });
  };

  /** Draw a rounded rectangle path. */
  const roundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  return { drawAreaChart, drawBarChart, palette };
})();

/* ═══════════════════════════════════════════════════════════════════════════
   6. UI UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Format cents to a currency string.
 * If `short` is true, use K/M suffixes for chart labels.
 */
function formatCurrency(cents, short = false) {
  const dollars = cents / 100;
  if (short) {
    if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(1)}M`;
    if (dollars >= 1_000) return `$${(dollars / 1_000).toFixed(1)}K`;
    return `$${dollars.toFixed(0)}`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dollars);
}

/** Format a number with K/M suffixes. */
function formatNumber(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString();
}

/** Relative time string (e.g. "2h ago", "yesterday"). */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay === 1) return 'yesterday';
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Format date as a full readable string. */
function formatDateFull(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Show a toast notification. type: 'success' | 'error' | 'info' | 'warning' */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText =
      'position:fixed;top:24px;right:24px;z-index:10000;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  const colors = {
    success: '#00b894',
    error: '#d63031',
    warning: '#fdcb6e',
    info: '#6C5CE7',
  };

  const toast = document.createElement('div');
  toast.style.cssText = `
    pointer-events:auto; display:flex; align-items:center; gap:10px;
    padding:14px 22px; border-radius:12px;
    background:rgba(26,26,46,0.95); backdrop-filter:blur(12px);
    border:1px solid ${colors[type]}44;
    color:#fff; font-size:14px; font-family:Inter,system-ui,sans-serif;
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
    transform:translateX(120%); transition:transform 0.35s cubic-bezier(.22,1,.36,1), opacity 0.3s;
    max-width:380px;
  `;

  toast.innerHTML = `
    <span style="width:28px;height:28px;border-radius:8px;background:${colors[type]}22;
      color:${colors[type]};display:flex;align-items:center;justify-content:center;
      font-size:14px;font-weight:700;flex-shrink:0;">${icons[type]}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/** Show a modal with the given HTML content. Returns a close function. */
function showModal(contentHTML, options = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal fade-in" style="max-width:${options.width || '580px'}">${contentHTML}</div>`;

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });

  // Close on Escape
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(overlay);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));

  return () => closeModal(overlay);
}

/** Close (and remove) a modal overlay. */
function closeModal(overlay) {
  if (!overlay) {
    overlay = document.querySelector('.modal-overlay.active');
  }
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  }
}

/** Render a skeleton loading placeholder. */
function renderSkeleton(count = 3, type = 'card') {
  if (type === 'card') {
    return Array.from({ length: count })
      .map(
        () => `
      <div class="card" style="padding:24px;">
        <div class="skeleton" style="width:60%;height:18px;margin-bottom:12px;"></div>
        <div class="skeleton" style="width:100%;height:14px;margin-bottom:8px;"></div>
        <div class="skeleton" style="width:80%;height:14px;"></div>
      </div>`
      )
      .join('');
  }
  if (type === 'table') {
    return Array.from({ length: count })
      .map(
        () => `
      <tr>
        <td><div class="skeleton" style="width:40px;height:40px;border-radius:8px;"></div></td>
        <td><div class="skeleton" style="width:80%;height:14px;"></div></td>
        <td><div class="skeleton" style="width:50%;height:14px;"></div></td>
        <td><div class="skeleton" style="width:60%;height:14px;"></div></td>
        <td><div class="skeleton" style="width:40%;height:14px;"></div></td>
      </tr>`
      )
      .join('');
  }
  return '';
}

/** Apply staggered fade-in animation to a list of elements. */
function animateStaggered(parentSelector, childSelector, baseDelay = 40) {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;
  const children = parent.querySelectorAll(childSelector);
  children.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * baseDelay);
  });
}

/** Debounce utility. */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/** Generate initials from an email for an avatar. */
function getInitials(email) {
  const parts = email.split('@')[0].split('.');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return email.substring(0, 2).toUpperCase();
}

/** Generate a consistent colour from a string. */
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 55%)`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. VIEW RENDERERS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Get the main content container. */
function getContentEl() {
  return document.getElementById('main-content');
}

/** Master render dispatcher. */
function renderView(view) {
  const el = getContentEl();
  if (!el) return;

  // Fade out, swap, fade in
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';

  setTimeout(() => {
    switch (view) {
      case 'dashboard':
        renderDashboard(el);
        break;
      case 'products':
        renderProducts(el);
        break;
      case 'sales':
        renderSales(el);
        break;
      case 'analytics':
        renderAnalytics(el);
        break;
      case 'settings':
        renderSettings(el);
        break;
      default:
        renderDashboard(el);
    }
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 150);
}

/* ─────────────────────────────────────────────────────────────────────────
   7a. DASHBOARD VIEW
   ───────────────────────────────────────────────────────────────────────── */

function renderDashboard(el) {
  const { stats, products, sales, revenueOverTime } = Store.getAll();

  // Top products by revenue
  const topProducts = [...products]
    .filter((p) => p.published)
    .sort((a, b) => b.sales_usd_cents - a.sales_usd_cents)
    .slice(0, 5);

  // Recent sales
  const recentSales = sales.slice(0, 10);

  el.innerHTML = `
    <div class="page-header">
      <h1>Dashboard</h1>
      <p class="page-subtitle">Welcome back! Here's an overview of your Gumroad store.</p>
    </div>

    <!-- Stat Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card-icon" style="background:rgba(108,92,231,0.15);color:#6C5CE7;">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <div class="stat-card-info">
          <span class="stat-card-label">Total Revenue</span>
          <span class="stat-card-value">${formatCurrency(stats.totalRevenue)}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon" style="background:rgba(0,206,201,0.15);color:#00cec9;">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div class="stat-card-info">
          <span class="stat-card-label">Total Sales</span>
          <span class="stat-card-value">${formatNumber(stats.totalSales)}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon" style="background:rgba(0,184,148,0.15);color:#00b894;">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <div class="stat-card-info">
          <span class="stat-card-label">Active Products</span>
          <span class="stat-card-value">${stats.activeProducts}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card-icon" style="background:rgba(253,121,168,0.15);color:#fd79a8;">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div class="stat-card-info">
          <span class="stat-card-label">This Month</span>
          <span class="stat-card-value">${formatCurrency(stats.monthRevenue)}</span>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="dashboard-grid">
      <div class="card" style="flex:2;min-width:0;">
        <div class="card-header">
          <h3>Revenue Over Time</h3>
        </div>
        <canvas id="dashboard-revenue-chart" style="width:100%;height:260px;"></canvas>
      </div>
      <div class="card" style="flex:1;min-width:280px;">
        <div class="card-header">
          <h3>Top Products</h3>
        </div>
        <canvas id="dashboard-products-chart" style="width:100%;height:260px;"></canvas>
      </div>
    </div>

    <!-- Recent Sales -->
    <div class="card">
      <div class="card-header">
        <h3>Recent Sales</h3>
        <a href="#sales" class="btn btn-sm btn-secondary">View All</a>
      </div>
      <div class="sales-list" id="recent-sales-list">
        ${
          recentSales.length === 0
            ? renderEmptyState('No sales yet', 'Your recent sales will appear here.')
            : recentSales.map((s) => renderSaleItem(s)).join('')
        }
      </div>
    </div>
  `;

  // Draw charts after DOM is ready
  requestAnimationFrame(() => {
    const revCanvas = document.getElementById('dashboard-revenue-chart');
    if (revCanvas) {
      Charts.drawAreaChart(revCanvas, revenueOverTime.map((d) => ({ label: d.label, value: d.value * 100 })));
    }

    const prodCanvas = document.getElementById('dashboard-products-chart');
    if (prodCanvas && topProducts.length > 0) {
      Charts.drawBarChart(
        prodCanvas,
        topProducts.map((p) => ({ label: p.name, value: p.sales_usd_cents })),
        { formatValue: (v) => formatCurrency(v, true) }
      );
    }

    // Stagger stat cards
    animateStaggered('.stats-grid', '.stat-card');
  });
}

/** Render empty state block. */
function renderEmptyState(title, subtitle) {
  return `
    <div class="empty-state">
      <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" viewBox="0 0 24 24">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
        <polyline points="13 2 13 9 20 9"/>
      </svg>
      <h3>${title}</h3>
      <p>${subtitle}</p>
    </div>
  `;
}

/** Render a single sale item row. */
function renderSaleItem(sale) {
  const initials = getInitials(sale.email);
  const bgColor = stringToColor(sale.email);
  const statusClass =
    sale.status === 'completed' ? 'badge-success' : sale.status === 'refunded' ? 'badge-danger' : 'badge-warning';

  return `
    <div class="sale-item" data-sale-id="${sale.id}" onclick="SaleDetail.show('${sale.id}')">
      <div class="customer-avatar" style="background:${bgColor};">${initials}</div>
      <div class="sale-item-info">
        <span class="sale-item-email">${sale.email}</span>
        <span class="sale-item-product">${sale.product_name}</span>
      </div>
      <div class="sale-amount">${formatCurrency(sale.price)}</div>
      <span class="badge ${statusClass}">${sale.status}</span>
      <span class="sale-item-date">${formatDate(sale.timestamp)}</span>
    </div>
  `;
}

/* ─────────────────────────────────────────────────────────────────────────
   7b. PRODUCTS VIEW
   ───────────────────────────────────────────────────────────────────────── */

function renderProducts(el) {
  const products = Store.get('products') || [];
  const filter = Store.get('productFilter') || '';
  const sort = Store.get('productSort') || { key: 'sales_count', dir: 'desc' };

  // Filter
  let filtered = products;
  if (filter) {
    const q = filter.toLowerCase();
    filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    let aVal = a[sort.key];
    let bVal = b[sort.key];
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();
    if (aVal < bVal) return sort.dir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sort.dir === 'asc' ? 1 : -1;
    return 0;
  });

  const sortIcon = (key) => {
    if (sort.key !== key) return '<span class="sort-icon">⇅</span>';
    return sort.dir === 'asc' ? '<span class="sort-icon active">↑</span>' : '<span class="sort-icon active">↓</span>';
  };

  el.innerHTML = `
    <div class="page-header">
      <h1>Products</h1>
      <p class="page-subtitle">Manage your Gumroad products.</p>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="products-toolbar">
          <div class="search-filter-group">
            <input type="text" class="form-input" id="product-search" placeholder="Search products…"
              value="${filter}" style="max-width:280px;" />
          </div>
        </div>
        <span class="badge" style="font-size:13px;">${filtered.length} product${filtered.length !== 1 ? 's' : ''}</span>
      </div>

      ${
        filtered.length === 0
          ? renderEmptyState('No products found', filter ? 'Try a different search term.' : 'Create your first product on Gumroad!')
          : `
        <div style="overflow-x:auto;">
          <table class="products-table">
            <thead>
              <tr>
                <th style="width:50px;"></th>
                <th class="sortable" data-sort="name">Name ${sortIcon('name')}</th>
                <th class="sortable" data-sort="price">Price ${sortIcon('price')}</th>
                <th class="sortable" data-sort="sales_count">Sales ${sortIcon('sales_count')}</th>
                <th class="sortable" data-sort="sales_usd_cents">Revenue ${sortIcon('sales_usd_cents')}</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((p) => renderProductRow(p)).join('')}
            </tbody>
          </table>
        </div>
      `
      }
    </div>
  `;

  // Events
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener(
      'input',
      debounce((e) => {
        Store.set('productFilter', e.target.value);
        renderProducts(el);
      }, 250)
    );
    searchInput.focus();
  }

  // Sort columns
  el.querySelectorAll('.sortable').forEach((th) => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const key = th.dataset.sort;
      const current = Store.get('productSort');
      const dir = current.key === key && current.dir === 'desc' ? 'asc' : 'desc';
      Store.set('productSort', { key, dir });
      renderProducts(el);
    });
  });

  // Animate rows
  requestAnimationFrame(() => animateStaggered('.products-table tbody', 'tr', 30));
}

function renderProductRow(p) {
  const statusMap = {
    published: 'status-active',
    draft: 'status-draft',
    archived: 'status-archived',
  };
  const statusLabel = p.published ? 'published' : p.status || 'draft';
  const statusClass = statusMap[statusLabel] || 'status-draft';

  // Simple gradient thumbnail placeholder based on product name
  const hue = Math.abs([...p.name].reduce((h, c) => c.charCodeAt(0) + ((h << 5) - h), 0)) % 360;
  const thumbBg = `linear-gradient(135deg, hsl(${hue},60%,50%), hsl(${(hue + 40) % 360},60%,40%))`;

  return `
    <tr class="product-row" data-product-id="${p.id}">
      <td>
        <div class="product-thumb" style="background:${thumbBg};">
          ${p.name.charAt(0)}
        </div>
      </td>
      <td>
        <span class="product-name" onclick="ProductDetail.show('${p.id}')" style="cursor:pointer;">
          ${p.name}
        </span>
      </td>
      <td><span class="product-price">${p.formatted_price || formatCurrency(p.price)}</span></td>
      <td>${formatNumber(p.sales_count)}</td>
      <td>${formatCurrency(p.sales_usd_cents)}</td>
      <td><span class="product-status ${statusClass}">${statusLabel}</span></td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-sm btn-icon" title="View on Gumroad" onclick="window.open('${p.preview_url || '#'}','_blank')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </button>
          <button class="btn btn-sm btn-icon" title="Copy Link" onclick="event.stopPropagation();navigator.clipboard.writeText('${p.short_url || ''}');showToast('Link copied!','success');">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
          <button class="btn btn-sm btn-icon" title="Details" onclick="ProductDetail.show('${p.id}')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `;
}

/* ─────────────────────────────────────────────────────────────────────────
   7c. SALES VIEW
   ───────────────────────────────────────────────────────────────────────── */

function renderSales(el) {
  const sales = Store.get('sales') || [];
  const products = Store.get('products') || [];
  const page = Store.get('salesPage') || 1;
  const perPage = Store.get('salesPerPage') || 15;
  const filters = Store.get('salesFilters') || {};

  // Apply filters
  let filtered = [...sales];

  if (filters.product) {
    filtered = filtered.filter((s) => s.product_id === filters.product);
  }
  if (filters.status) {
    filtered = filtered.filter((s) => s.status === filters.status);
  }
  if (filters.dateFrom) {
    const from = new Date(filters.dateFrom);
    filtered = filtered.filter((s) => new Date(s.timestamp) >= from);
  }
  if (filters.dateTo) {
    const to = new Date(filters.dateTo);
    to.setHours(23, 59, 59, 999);
    filtered = filtered.filter((s) => new Date(s.timestamp) <= to);
  }

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  el.innerHTML = `
    <div class="page-header">
      <h1>Sales</h1>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-secondary btn-sm" id="export-csv-btn">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header" style="flex-wrap:wrap;gap:12px;">
        <div class="search-filter-group" style="display:flex;gap:10px;flex-wrap:wrap;">
          <select class="form-select" id="sales-filter-product" style="max-width:220px;">
            <option value="">All Products</option>
            ${products.map((p) => `<option value="${p.id}" ${filters.product === p.id ? 'selected' : ''}>${p.name}</option>`).join('')}
          </select>
          <select class="form-select" id="sales-filter-status" style="max-width:160px;">
            <option value="">All Statuses</option>
            <option value="completed" ${filters.status === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="refunded" ${filters.status === 'refunded' ? 'selected' : ''}>Refunded</option>
            <option value="disputed" ${filters.status === 'disputed' ? 'selected' : ''}>Disputed</option>
          </select>
          <input type="date" class="form-input" id="sales-filter-from" value="${filters.dateFrom || ''}" style="max-width:160px;" />
          <input type="date" class="form-input" id="sales-filter-to" value="${filters.dateTo || ''}" style="max-width:160px;" />
        </div>
        <span class="badge" style="font-size:13px;">${filtered.length} sale${filtered.length !== 1 ? 's' : ''}</span>
      </div>
    </div>

    <!-- Sales List -->
    <div class="card">
      <div class="sales-list" id="sales-list-container">
        ${
          paginated.length === 0
            ? renderEmptyState('No sales found', 'Try adjusting your filters.')
            : paginated.map((s) => renderSaleItem(s)).join('')
        }
      </div>

      ${
        totalPages > 1
          ? `
        <div class="pagination">
          <button class="btn btn-sm btn-secondary" id="sales-prev" ${page <= 1 ? 'disabled' : ''}>← Previous</button>
          <span class="pagination-info">Page ${page} of ${totalPages}</span>
          <button class="btn btn-sm btn-secondary" id="sales-next" ${page >= totalPages ? 'disabled' : ''}>Next →</button>
        </div>
      `
          : ''
      }
    </div>
  `;

  // ─── events ────────────────────────────────────────────────────────
  const bindFilter = (id, key) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.addEventListener('change', (e) => {
        const f = { ...Store.get('salesFilters'), [key]: e.target.value };
        Store.set('salesFilters', f);
        Store.set('salesPage', 1);
        renderSales(el);
      });
    }
  };

  bindFilter('sales-filter-product', 'product');
  bindFilter('sales-filter-status', 'status');
  bindFilter('sales-filter-from', 'dateFrom');
  bindFilter('sales-filter-to', 'dateTo');

  const prevBtn = document.getElementById('sales-prev');
  const nextBtn = document.getElementById('sales-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { Store.set('salesPage', page - 1); renderSales(el); });
  if (nextBtn) nextBtn.addEventListener('click', () => { Store.set('salesPage', page + 1); renderSales(el); });

  // Export CSV
  const exportBtn = document.getElementById('export-csv-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => exportSalesCSV(filtered));
  }

  requestAnimationFrame(() => animateStaggered('#sales-list-container', '.sale-item', 25));
}

/** Export sales to CSV and trigger download. */
function exportSalesCSV(sales) {
  const headers = ['Date', 'Email', 'Product', 'Amount', 'Status', 'Country', 'Order #'];
  const rows = sales.map((s) => [
    new Date(s.timestamp).toISOString(),
    s.email,
    `"${s.product_name}"`,
    (s.price / 100).toFixed(2),
    s.status,
    s.country || '',
    s.order_number || '',
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gumroad-sales-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Exported ${sales.length} sales to CSV`, 'success');
}

/* ─────────────────────────────────────────────────────────────────────────
   7d. ANALYTICS VIEW
   ───────────────────────────────────────────────────────────────────────── */

function renderAnalytics(el) {
  const products = Store.get('products') || [];
  const sales = Store.get('sales') || [];
  const revenueOverTime = Store.get('revenueOverTime') || [];

  // Sales by product
  const salesByProduct = {};
  sales.forEach((s) => {
    if (!salesByProduct[s.product_name]) salesByProduct[s.product_name] = 0;
    salesByProduct[s.product_name] += s.price;
  });
  const productChartData = Object.entries(salesByProduct)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Geographic distribution
  const geoData = {};
  sales.forEach((s) => {
    const name = s.country_name || s.country || 'Unknown';
    if (!geoData[name]) geoData[name] = 0;
    geoData[name] += 1;
  });
  const geoChartData = Object.entries(geoData)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Monthly conversion trend (mock: sales / views estimate)
  const conversionData = revenueOverTime.map((d) => ({
    label: d.label,
    value: Math.round(2.5 + Math.random() * 3.5), // Mock conversion rate %
  }));

  el.innerHTML = `
    <div class="page-header">
      <h1>Analytics</h1>
      <p class="page-subtitle">Deep-dive into your store's performance metrics.</p>
    </div>

    <!-- Revenue Over Time -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header"><h3>Revenue Over Time</h3></div>
      <canvas id="analytics-revenue-chart" style="width:100%;height:300px;"></canvas>
    </div>

    <div class="dashboard-grid" style="margin-bottom:20px;">
      <!-- Sales by Product -->
      <div class="card" style="flex:1;min-width:0;">
        <div class="card-header"><h3>Sales by Product</h3></div>
        <canvas id="analytics-product-chart" style="width:100%;height:320px;"></canvas>
      </div>

      <!-- Geographic Distribution -->
      <div class="card" style="flex:1;min-width:0;">
        <div class="card-header"><h3>Geographic Distribution</h3></div>
        <canvas id="analytics-geo-chart" style="width:100%;height:320px;"></canvas>
      </div>
    </div>

    <!-- Conversion Trends -->
    <div class="card">
      <div class="card-header"><h3>Conversion Rate Trend (%)</h3></div>
      <canvas id="analytics-conversion-chart" style="width:100%;height:250px;"></canvas>
    </div>
  `;

  requestAnimationFrame(() => {
    const revCanvas = document.getElementById('analytics-revenue-chart');
    if (revCanvas) {
      Charts.drawAreaChart(revCanvas, revenueOverTime.map((d) => ({ label: d.label, value: d.value * 100 })));
    }

    const prodCanvas = document.getElementById('analytics-product-chart');
    if (prodCanvas) {
      Charts.drawBarChart(prodCanvas, productChartData, { formatValue: (v) => formatCurrency(v, true) });
    }

    const geoCanvas = document.getElementById('analytics-geo-chart');
    if (geoCanvas) {
      Charts.drawBarChart(geoCanvas, geoChartData, { formatValue: (v) => `${v} sales` });
    }

    const convCanvas = document.getElementById('analytics-conversion-chart');
    if (convCanvas) {
      Charts.drawAreaChart(convCanvas, conversionData.map((d) => ({ label: d.label, value: d.value * 100 })), {
        lineColor: '#00cec9',
        gradientTop: 'rgba(0,206,201,0.35)',
        gradientBottom: 'rgba(0,206,201,0.0)',
      });
    }
  });
}

/* ─────────────────────────────────────────────────────────────────────────
   7e. SETTINGS VIEW
   ───────────────────────────────────────────────────────────────────────── */

function renderSettings(el) {
  const token = GumroadAPI.accessToken || '';
  const theme = Store.get('theme') || 'dark';
  const notifications = Store.get('notifications') || { sales: true, weekly: true };

  el.innerHTML = `
    <div class="page-header">
      <h1>Settings</h1>
      <p class="page-subtitle">Configure your dashboard preferences.</p>
    </div>

    <!-- API Token -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header"><h3>API Connection</h3></div>
      <div class="modal-body" style="padding:24px;">
        <div class="form-group">
          <label class="form-label" for="api-token-input">Gumroad Access Token</label>
          <div style="display:flex;gap:10px;">
            <div style="position:relative;flex:1;">
              <input type="password" class="form-input" id="api-token-input"
                placeholder="Enter your Gumroad access token…" value="${token}" />
              <button class="btn btn-icon" id="toggle-token-vis"
                style="position:absolute;right:8px;top:50%;transform:translateY(-50%);padding:4px;"
                title="Show/Hide token">
                <svg id="eye-icon" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            <button class="btn btn-primary" id="save-token-btn">Save</button>
            <button class="btn btn-secondary" id="test-conn-btn">Test Connection</button>
          </div>
          <p style="margin-top:8px;font-size:12px;color:rgba(255,255,255,0.4);">
            Get your token from <a href="https://app.gumroad.com/settings/advanced" target="_blank" style="color:#6C5CE7;">Gumroad Settings → Advanced</a>.
            ${Store.get('useMockData') ? '<span class="badge badge-warning" style="margin-left:8px;">Using demo data</span>' : '<span class="badge badge-success" style="margin-left:8px;">Connected</span>'}
          </p>
        </div>
      </div>
    </div>

    <!-- Theme -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header"><h3>Appearance</h3></div>
      <div class="modal-body" style="padding:24px;">
        <div class="form-group">
          <label class="form-label">Theme</label>
          <div class="tabs" id="theme-tabs" style="margin-top:8px;">
            <button class="tab-item ${theme === 'dark' ? 'active' : ''}" data-theme="dark">🌙 Dark</button>
            <button class="tab-item ${theme === 'light' ? 'active' : ''}" data-theme="light">☀️ Light</button>
            <button class="tab-item ${theme === 'auto' ? 'active' : ''}" data-theme="auto">🖥 System</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <div class="card" style="margin-bottom:20px;">
      <div class="card-header"><h3>Notifications</h3></div>
      <div class="modal-body" style="padding:24px;">
        <div class="form-group" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <div>
            <label class="form-label" style="margin-bottom:2px;">Sale notifications</label>
            <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;">Get notified when you make a sale.</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="notif-sales" ${notifications.sales ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="form-group" style="display:flex;align-items:center;justify-content:space-between;">
          <div>
            <label class="form-label" style="margin-bottom:2px;">Weekly digest</label>
            <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;">Receive a weekly summary of your store performance.</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="notif-weekly" ${notifications.weekly ? 'checked' : ''} />
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="card">
      <div class="card-header"><h3>Danger Zone</h3></div>
      <div class="modal-body" style="padding:24px;">
        <button class="btn btn-danger" id="clear-data-btn">Clear All Local Data</button>
        <p style="margin-top:8px;font-size:12px;color:rgba(255,255,255,0.4);">
          This will remove your API token and all preferences from this browser.
        </p>
      </div>
    </div>
  `;

  // ─── Event Handlers ─────────────────────────────────────────────────

  // Toggle token visibility
  document.getElementById('toggle-token-vis')?.addEventListener('click', () => {
    const input = document.getElementById('api-token-input');
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  });

  // Save token
  document.getElementById('save-token-btn')?.addEventListener('click', () => {
    const input = document.getElementById('api-token-input');
    if (!input) return;
    const newToken = input.value.trim();
    GumroadAPI.accessToken = newToken;

    if (newToken) {
      localStorage.setItem('gumroad_access_token', newToken);
      Store.set('useMockData', false);
      showToast('API token saved! Fetching live data…', 'success');
      loadData(); // Re-fetch with real token
    } else {
      localStorage.removeItem('gumroad_access_token');
      Store.set('useMockData', true);
      showToast('Token cleared. Using demo data.', 'info');
      loadMockData();
    }

    // Re-render settings to update badge
    setTimeout(() => renderSettings(el), 500);
  });

  // Test connection
  document.getElementById('test-conn-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('test-conn-btn');
    btn.textContent = 'Testing…';
    btn.disabled = true;
    try {
      const user = await GumroadAPI.testConnection();
      if (user) {
        showToast(`Connected as ${user.name || user.email || 'Gumroad User'}`, 'success');
      } else {
        showToast('Connection failed: no user returned.', 'error');
      }
    } catch (err) {
      showToast(`Connection failed: ${err.message}`, 'error');
    } finally {
      btn.textContent = 'Test Connection';
      btn.disabled = false;
    }
  });

  // Theme tabs
  document.querySelectorAll('#theme-tabs .tab-item').forEach((tab) => {
    tab.addEventListener('click', () => {
      const t = tab.dataset.theme;
      Store.set('theme', t);
      localStorage.setItem('theme', t);
      document.querySelectorAll('#theme-tabs .tab-item').forEach((tt) => tt.classList.remove('active'));
      tab.classList.add('active');
      applyTheme(t);
      showToast(`Theme set to ${t}`, 'info');
    });
  });

  // Notification toggles
  const bindNotif = (id, key) => {
    document.getElementById(id)?.addEventListener('change', (e) => {
      const n = { ...Store.get('notifications'), [key]: e.target.checked };
      Store.set('notifications', n);
      localStorage.setItem('notifications', JSON.stringify(n));
      showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
    });
  };
  bindNotif('notif-sales', 'sales');
  bindNotif('notif-weekly', 'weekly');

  // Clear data
  document.getElementById('clear-data-btn')?.addEventListener('click', () => {
    const close = showModal(`
      <div class="modal-header">
        <h3>Clear All Local Data?</h3>
        <button class="btn btn-icon modal-close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <p>This will remove your API token, theme preferences, and notification settings. You'll need to re-enter your token to reconnect.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
        <button class="btn btn-danger" id="confirm-clear-btn">Clear Everything</button>
      </div>
    `);

    document.getElementById('confirm-clear-btn')?.addEventListener('click', () => {
      localStorage.removeItem('gumroad_access_token');
      localStorage.removeItem('theme');
      localStorage.removeItem('notifications');
      GumroadAPI.accessToken = '';
      Store.set('useMockData', true);
      closeModal();
      showToast('All local data cleared.', 'success');
      loadMockData();
      renderSettings(el);
    });
  });
}

/** Apply a theme class to <html>. */
function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme === 'auto' ? 'dark' : theme);
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. DETAIL MODALS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Product detail modal. */
const ProductDetail = {
  show(productId) {
    const products = Store.get('products') || [];
    const p = products.find((pr) => pr.id === productId);
    if (!p) {
      showToast('Product not found.', 'error');
      return;
    }

    const statusLabel = p.published ? 'published' : p.status || 'draft';
    const statusMap = { published: 'badge-success', draft: 'badge-warning', archived: 'badge-danger' };

    showModal(
      `
      <div class="modal-header">
        <h3>${p.name}</h3>
        <button class="btn btn-icon modal-close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <p style="color:rgba(255,255,255,0.6);margin-bottom:16px;">${p.description || 'No description available.'}</p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
          <div>
            <span class="form-label">Price</span>
            <p style="font-size:20px;font-weight:600;color:#fff;margin:4px 0;">${formatCurrency(p.price)}</p>
          </div>
          <div>
            <span class="form-label">Revenue</span>
            <p style="font-size:20px;font-weight:600;color:#fff;margin:4px 0;">${formatCurrency(p.sales_usd_cents)}</p>
          </div>
          <div>
            <span class="form-label">Sales</span>
            <p style="font-size:20px;font-weight:600;color:#fff;margin:4px 0;">${formatNumber(p.sales_count)}</p>
          </div>
          <div>
            <span class="form-label">Status</span>
            <p style="margin:4px 0;"><span class="badge ${statusMap[statusLabel] || 'badge-warning'}">${statusLabel}</span></p>
          </div>
        </div>

        ${
          p.tags && p.tags.length
            ? `<div style="margin-bottom:16px;">
                <span class="form-label">Tags</span>
                <div style="display:flex;gap:6px;margin-top:4px;">
                  ${p.tags.map((t) => `<span class="badge">${t}</span>`).join('')}
                </div>
              </div>`
            : ''
        }

        <div style="display:flex;gap:8px;font-size:12px;color:rgba(255,255,255,0.4);">
          <span>Created: ${formatDateFull(p.created_at)}</span>
          <span>·</span>
          <span>Updated: ${formatDateFull(p.updated_at)}</span>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        <button class="btn btn-primary" onclick="window.open('${p.preview_url || '#'}','_blank')">View on Gumroad</button>
      </div>
    `,
      { width: '560px' }
    );
  },
};

/** Sale detail modal. */
const SaleDetail = {
  show(saleId) {
    const sales = Store.get('sales') || [];
    const s = sales.find((sl) => sl.id === saleId);
    if (!s) {
      showToast('Sale not found.', 'error');
      return;
    }

    const statusClass =
      s.status === 'completed' ? 'badge-success' : s.status === 'refunded' ? 'badge-danger' : 'badge-warning';

    showModal(
      `
      <div class="modal-header">
        <h3>Sale Details</h3>
        <button class="btn btn-icon modal-close-btn" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div>
            <span class="form-label">Customer</span>
            <p style="color:#fff;margin:4px 0;">${s.email}</p>
          </div>
          <div>
            <span class="form-label">Amount</span>
            <p style="font-size:20px;font-weight:600;color:#fff;margin:4px 0;">${formatCurrency(s.price)}</p>
          </div>
          <div>
            <span class="form-label">Product</span>
            <p style="color:#fff;margin:4px 0;">${s.product_name}</p>
          </div>
          <div>
            <span class="form-label">Status</span>
            <p style="margin:4px 0;"><span class="badge ${statusClass}">${s.status}</span></p>
          </div>
          <div>
            <span class="form-label">Date</span>
            <p style="color:#fff;margin:4px 0;">${formatDateFull(s.timestamp)}</p>
          </div>
          <div>
            <span class="form-label">Order #</span>
            <p style="color:#fff;margin:4px 0;">${s.order_number || '—'}</p>
          </div>
          <div>
            <span class="form-label">Country</span>
            <p style="color:#fff;margin:4px 0;">${s.country_name || s.country || '—'}</p>
          </div>
          <div>
            <span class="form-label">Referrer</span>
            <p style="color:#fff;margin:4px 0;">${s.referrer || 'Direct'}</p>
          </div>
        </div>
        ${s.is_gift ? '<p style="margin-top:12px;"><span class="badge badge-success">🎁 Gift purchase</span></p>' : ''}
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      </div>
    `,
      { width: '540px' }
    );
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   9. GLOBAL SEARCH
   ═══════════════════════════════════════════════════════════════════════════ */

const GlobalSearch = (() => {
  let dropdownEl = null;

  const init = () => {
    const input = document.getElementById('global-search-input');
    if (!input) return;

    input.addEventListener(
      'input',
      debounce((e) => {
        const q = e.target.value.trim().toLowerCase();
        if (q.length < 2) {
          hideDropdown();
          return;
        }
        performSearch(q);
      }, 300)
    );

    input.addEventListener('focus', () => {
      const q = input.value.trim().toLowerCase();
      if (q.length >= 2) performSearch(q);
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-bar')) hideDropdown();
    });

    // Escape key closes search
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.blur();
        hideDropdown();
      }
    });
  };

  const performSearch = (q) => {
    const products = Store.get('products') || [];
    const sales = Store.get('sales') || [];

    const matchedProducts = products
      .filter((p) => p.name.toLowerCase().includes(q) || (p.tags || []).some((t) => t.includes(q)))
      .slice(0, 5);

    const matchedSales = sales
      .filter((s) => s.email.toLowerCase().includes(q) || s.product_name.toLowerCase().includes(q))
      .slice(0, 5);

    if (matchedProducts.length === 0 && matchedSales.length === 0) {
      showDropdown(`<div class="search-no-results">No results for "${q}"</div>`);
      return;
    }

    let html = '';

    if (matchedProducts.length > 0) {
      html += `<div class="search-section-label">Products</div>`;
      html += matchedProducts
        .map(
          (p) => `
        <div class="search-result-item" onclick="ProductDetail.show('${p.id}');GlobalSearch.hide();">
          <span class="search-result-icon">📦</span>
          <div>
            <div class="search-result-title">${highlightMatch(p.name, q)}</div>
            <div class="search-result-meta">${formatCurrency(p.price)} · ${formatNumber(p.sales_count)} sales</div>
          </div>
        </div>
      `
        )
        .join('');
    }

    if (matchedSales.length > 0) {
      html += `<div class="search-section-label">Sales</div>`;
      html += matchedSales
        .map(
          (s) => `
        <div class="search-result-item" onclick="SaleDetail.show('${s.id}');GlobalSearch.hide();">
          <span class="search-result-icon">💰</span>
          <div>
            <div class="search-result-title">${highlightMatch(s.email, q)}</div>
            <div class="search-result-meta">${s.product_name} · ${formatCurrency(s.price)}</div>
          </div>
        </div>
      `
        )
        .join('');
    }

    showDropdown(html);
  };

  const highlightMatch = (text, query) => {
    const idx = text.toLowerCase().indexOf(query);
    if (idx === -1) return text;
    return text.substring(0, idx) + '<mark>' + text.substring(idx, idx + query.length) + '</mark>' + text.substring(idx + query.length);
  };

  const showDropdown = (html) => {
    if (!dropdownEl) {
      dropdownEl = document.createElement('div');
      dropdownEl.className = 'search-dropdown';
      const searchBar = document.querySelector('.search-bar');
      if (searchBar) searchBar.appendChild(dropdownEl);
    }
    dropdownEl.innerHTML = html;
    dropdownEl.style.display = 'block';
  };

  const hideDropdown = () => {
    if (dropdownEl) dropdownEl.style.display = 'none';
  };

  return { init, hide: hideDropdown };
})();

/* ═══════════════════════════════════════════════════════════════════════════
   10. DATA LOADING
   ═══════════════════════════════════════════════════════════════════════════ */

/** Load mock data into the store. */
function loadMockData() {
  Store.set('products', MockData.products);
  Store.set('sales', MockData.sales);
  Store.set('revenueOverTime', MockData.revenueOverTime);
  Store.computeStats();
}

/** Load live data from the Gumroad API. */
async function loadLiveData() {
  Store.set('isLoading', true);
  try {
    const products = await GumroadAPI.getProducts();

    // Normalise product fields
    const normalised = products.map((p) => ({
      ...p,
      status: p.published ? 'published' : 'draft',
      sales_count: p.sales_count || 0,
      sales_usd_cents: p.sales_usd_cents || 0,
      thumbnail_url: p.thumbnail_url || '',
      tags: p.tags || [],
    }));

    Store.set('products', normalised);

    // Fetch sales (first page)
    const salesData = await GumroadAPI.getSales({ page: 1 });
    const sales = (salesData.sales || []).map((s) => ({
      ...s,
      status: s.refunded ? 'refunded' : s.disputed ? 'disputed' : 'completed',
      timestamp: s.created_at,
      product_name: s.product_name || 'Unknown Product',
    }));

    Store.set('sales', sales);

    // Generate revenue chart data from sales
    generateRevenueFromSales(sales);

    Store.computeStats();
    showToast('Live data loaded successfully!', 'success');
  } catch (err) {
    console.error('[loadLiveData]', err);
    showToast(`Failed to load data: ${err.message}. Falling back to demo.`, 'error');
    Store.set('useMockData', true);
    loadMockData();
  } finally {
    Store.set('isLoading', false);
  }
}

/** Build monthly revenue data from a sales array. */
function generateRevenueFromSales(sales) {
  const months = {};
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    months[key] = { label, value: 0 };
  }

  sales.forEach((s) => {
    if (s.status !== 'completed') return;
    const d = new Date(s.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (months[key]) {
      months[key].value += s.price;
    }
  });

  Store.set('revenueOverTime', Object.values(months));
}

/** Main data loader: chooses mock or live. */
async function loadData() {
  if (Store.get('useMockData')) {
    loadMockData();
  } else {
    await loadLiveData();
  }
  // Re-render current view
  renderView(Store.get('currentView'));
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. SIDEBAR & TOP BAR SCAFFOLD
   ═══════════════════════════════════════════════════════════════════════════ */

/** Build the app shell (sidebar + top bar + content area). */
function buildShell() {
  const app = document.getElementById('app');
  if (!app) {
    console.error('[App] #app element not found in DOM.');
    return;
  }

  app.innerHTML = `
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="url(#logo-grad)"/>
          <path d="M8 14.5L12 18.5L20 10" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <defs><linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28"><stop stop-color="#6C5CE7"/><stop offset="1" stop-color="#a29bfe"/></linearGradient></defs>
        </svg>
        <span>Gumroad<strong>HQ</strong></span>
      </div>

      <nav class="sidebar-nav">
        <a class="nav-item active" data-view="dashboard" href="#dashboard">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span>Dashboard</span>
        </a>
        <a class="nav-item" data-view="products" href="#products">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>Products</span>
        </a>
        <a class="nav-item" data-view="sales" href="#sales">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span>Sales</span>
        </a>
        <a class="nav-item" data-view="analytics" href="#analytics">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          <span>Analytics</span>
        </a>
        <a class="nav-item" data-view="settings" href="#settings">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Settings</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user-avatar">G</div>
          <div class="sidebar-user-info">
            <span class="sidebar-user-name">Gumroad User</span>
            <span class="sidebar-user-role">${Store.get('useMockData') ? 'Demo Mode' : 'Connected'}</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Area -->
    <div class="main-content">
      <!-- Top Bar -->
      <header class="top-bar">
        <button class="btn btn-icon sidebar-toggle" id="sidebar-toggle" title="Toggle sidebar">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        <div class="search-bar" style="position:relative;">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);opacity:0.4;pointer-events:none;">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" id="global-search-input" placeholder="Search products, sales…" style="padding-left:36px;" />
        </div>

        <div class="top-bar-actions">
          <button class="btn btn-icon" title="Notifications" id="notif-bell">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </button>
          <button class="btn btn-icon" title="Refresh data" id="refresh-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <div class="content-area" id="main-content" style="transition:opacity 0.15s ease,transform 0.15s ease;">
        ${renderSkeleton(3)}
      </div>
    </div>
  `;

  // ─── shell events ──────────────────────────────────────────────────
  // Sidebar toggle (mobile)
  document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.toggle('open');
  });

  // Close sidebar on nav click (mobile)
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      document.querySelector('.sidebar')?.classList.remove('open');
    });
  });

  // Refresh button
  document.getElementById('refresh-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('refresh-btn');
    if (btn) btn.style.animation = 'spin 0.6s ease';
    await loadData();
    if (btn) btn.style.animation = '';
    showToast('Data refreshed!', 'success');
  });

  // Notification bell (placeholder)
  document.getElementById('notif-bell')?.addEventListener('click', () => {
    showToast('No new notifications.', 'info');
  });

  // Init global search
  GlobalSearch.init();
}

/* ═══════════════════════════════════════════════════════════════════════════
   12. RESIZE HANDLER — Redraw all visible canvases
   ═══════════════════════════════════════════════════════════════════════════ */

const ResizeHandler = (() => {
  let timeout;

  const handler = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      // Re-render current view to redraw canvases
      renderView(Store.get('currentView'));
    }, 200);
  };

  return { init: () => window.addEventListener('resize', handler) };
})();

/* ═══════════════════════════════════════════════════════════════════════════
   13. APP INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════════ */

const App = {
  async init() {
    console.log('[GumroadHQ] Initialising…');

    // Apply saved theme
    applyTheme(Store.get('theme'));

    // Build the DOM shell
    buildShell();

    // Load data (mock or live)
    await loadData();

    // Init router (reads hash → renders correct view)
    Router.init();

    // Responsive chart redraws
    ResizeHandler.init();

    console.log('[GumroadHQ] Ready ✓');
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   BOOTSTRAP
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
