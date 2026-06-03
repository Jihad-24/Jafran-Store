const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getOverviewStats(role) {
  await wait();
  if (role === "admin") {
    return {
      cards: [
        {
          id: "items",
          label: "Total items",
          value: "1,842",
          hint: "+4.2% vs last month",
        },
        {
          id: "users",
          label: "Total users",
          value: "9,321",
          hint: "+1.1% vs last month",
        },
        {
          id: "revenue",
          label: "Revenue (30d)",
          value: "$428,900",
          hint: "+8.7% vs prior period",
        },
        {
          id: "orders",
          label: "Orders today",
          value: "156",
          hint: "+12 vs yesterday",
        },
      ],
    };
  }
  return {
    cards: [
      {
        id: "myItems",
        label: "My items",
        value: "12",
        hint: "2 pending review",
      },
      { id: "orders", label: "My orders", value: "8", hint: "1 in transit" },
      {
        id: "saved",
        label: "Saved for later",
        value: "3",
        hint: "Updated today",
      },
      {
        id: "activity",
        label: "Activity (7d)",
        value: "24",
        hint: "Views + messages",
      },
    ],
  };
}

export async function getChartData(role) {
  await wait();
  const barData =
    role === "admin"
      ? [
          { name: "Mon", sales: 4200, listings: 120 },
          { name: "Tue", sales: 5100, listings: 132 },
          { name: "Wed", sales: 4800, listings: 118 },
          { name: "Thu", sales: 6200, listings: 145 },
          { name: "Fri", sales: 7100, listings: 160 },
          { name: "Sat", sales: 5900, listings: 140 },
          { name: "Sun", sales: 4500, listings: 125 },
        ]
      : [
          { name: "Mon", sales: 120, listings: 2 },
          { name: "Tue", sales: 180, listings: 3 },
          { name: "Wed", sales: 90, listings: 1 },
          { name: "Thu", sales: 210, listings: 4 },
          { name: "Fri", sales: 240, listings: 3 },
          { name: "Sat", sales: 160, listings: 2 },
          { name: "Sun", sales: 140, listings: 2 },
        ];

  const lineData =
    role === "admin"
      ? [
          { month: "Jan", users: 2100, revenue: 120000 },
          { month: "Feb", users: 2400, revenue: 132000 },
          { month: "Mar", users: 2800, revenue: 148000 },
          { month: "Apr", users: 3100, revenue: 165000 },
          { month: "May", users: 3600, revenue: 182000 },
          { month: "Jun", users: 4100, revenue: 201000 },
        ]
      : [
          { month: "Jan", users: 4, revenue: 320 },
          { month: "Feb", users: 6, revenue: 410 },
          { month: "Mar", users: 5, revenue: 380 },
          { month: "Apr", users: 8, revenue: 520 },
          { month: "May", users: 9, revenue: 600 },
          { month: "Jun", users: 8, revenue: 540 },
        ];

  const pieData =
    role === "admin"
      ? [
          { name: "Electronics", value: 38 },
          { name: "Home", value: 24 },
          { name: "Fashion", value: 18 },
          { name: "Sports", value: 12 },
          { name: "Other", value: 8 },
        ]
      : [
          { name: "Listed", value: 45 },
          { name: "Sold", value: 30 },
          { name: "Draft", value: 15 },
          { name: "Archived", value: 10 },
        ];

  return { barData, lineData, pieData };
}

const MOCK_USERS = [
  {
    id: "u1",
    name: "Avery Chen",
    email: "avery@example.com",
    role: "User",
    status: "Active",
    joined: "2025-11-02",
  },
  {
    id: "u2",
    name: "Jordan Smith",
    email: "jordan@example.com",
    role: "User",
    status: "Active",
    joined: "2025-10-18",
  },
  {
    id: "u3",
    name: "Riley Jones",
    email: "riley@example.com",
    role: "Admin",
    status: "Active",
    joined: "2025-09-05",
  },
  {
    id: "u4",
    name: "Quinn Patel",
    email: "quinn@example.com",
    role: "User",
    status: "Suspended",
    joined: "2025-08-22",
  },
  {
    id: "u5",
    name: "Morgan Lee",
    email: "morgan@example.com",
    role: "User",
    status: "Active",
    joined: "2026-01-14",
  },
  {
    id: "u6",
    name: "Casey Brown",
    email: "casey@example.com",
    role: "User",
    status: "Active",
    joined: "2026-02-01",
  },
  {
    id: "u7",
    name: "Skyler Kim",
    email: "skyler@example.com",
    role: "User",
    status: "Active",
    joined: "2026-02-28",
  },
  {
    id: "u8",
    name: "Drew Wilson",
    email: "drew@example.com",
    role: "User",
    status: "Invited",
    joined: "2026-03-10",
  },
  {
    id: "u9",
    name: "Jamie Ortiz",
    email: "jamie@example.com",
    role: "User",
    status: "Active",
    joined: "2026-03-22",
  },
  {
    id: "u10",
    name: "Taylor Brooks",
    email: "taylor@example.com",
    role: "User",
    status: "Active",
    joined: "2026-04-02",
  },
  {
    id: "u11",
    name: "Reese Martin",
    email: "reese@example.com",
    role: "User",
    status: "Suspended",
    joined: "2026-04-08",
  },
  {
    id: "u12",
    name: "Blake Garcia",
    email: "blake@example.com",
    role: "Admin",
    status: "Active",
    joined: "2025-07-19",
  },
];

const MOCK_ADMIN_ITEMS = [
  {
    id: "i1",
    title: "Noise-canceling headphones",
    sku: "EL-1001",
    category: "Electronics",
    price: 249,
    stock: 42,
    status: "Live",
  },
  {
    id: "i2",
    title: "Ceramic pour-over set",
    sku: "HM-2044",
    category: "Home",
    price: 64,
    stock: 18,
    status: "Live",
  },
  {
    id: "i3",
    title: "Trail running shoes",
    sku: "SP-5510",
    category: "Sports",
    price: 129,
    stock: 0,
    status: "Out of stock",
  },
  {
    id: "i4",
    title: "Linen blazer",
    sku: "FS-8832",
    category: "Fashion",
    price: 189,
    stock: 9,
    status: "Live",
  },
  {
    id: "i5",
    title: "Smart desk lamp",
    sku: "EL-2209",
    category: "Electronics",
    price: 79,
    stock: 120,
    status: "Live",
  },
  {
    id: "i6",
    title: "Yoga mat pro",
    sku: "SP-1200",
    category: "Sports",
    price: 48,
    stock: 200,
    status: "Live",
  },
  {
    id: "i7",
    title: "Wool throw blanket",
    sku: "HM-3311",
    category: "Home",
    price: 95,
    stock: 33,
    status: "Draft",
  },
  {
    id: "i8",
    title: "Leather tote",
    sku: "FS-7710",
    category: "Fashion",
    price: 210,
    stock: 14,
    status: "Live",
  },
  {
    id: "i9",
    title: "4K webcam",
    sku: "EL-4402",
    category: "Electronics",
    price: 159,
    stock: 58,
    status: "Live",
  },
  {
    id: "i10",
    title: "Stainless kettle",
    sku: "HM-1098",
    category: "Home",
    price: 54,
    stock: 76,
    status: "Live",
  },
  {
    id: "i11",
    title: "Pickleball paddle",
    sku: "SP-9001",
    category: "Sports",
    price: 89,
    stock: 22,
    status: "Live",
  },
  {
    id: "i12",
    title: "Merino crewneck",
    sku: "FS-6601",
    category: "Fashion",
    price: 72,
    stock: 41,
    status: "Archived",
  },
];

const MOCK_CATEGORIES = [
  {
    id: "c1",
    name: "Electronics",
    slug: "electronics",
    items: 412,
    updated: "2026-04-28",
  },
  { id: "c2", name: "Home", slug: "home", items: 286, updated: "2026-04-27" },
  {
    id: "c3",
    name: "Fashion",
    slug: "fashion",
    items: 198,
    updated: "2026-04-26",
  },
  {
    id: "c4",
    name: "Sports",
    slug: "sports",
    items: 154,
    updated: "2026-04-25",
  },
  { id: "c5", name: "Books", slug: "books", items: 92, updated: "2026-04-20" },
  {
    id: "c6",
    name: "Beauty",
    slug: "beauty",
    items: 67,
    updated: "2026-04-18",
  },
  { id: "c7", name: "Toys", slug: "toys", items: 55, updated: "2026-04-12" },
  {
    id: "c8",
    name: "Automotive",
    slug: "automotive",
    items: 43,
    updated: "2026-04-10",
  },
];

const MOCK_MY_ITEMS = [
  { id: "m1", title: "Vintage camera", status: "Live", views: 128, price: 320 },
  { id: "m2", title: "Desk organizer", status: "Draft", views: 12, price: 24 },
  {
    id: "m3",
    title: "Bluetooth speaker",
    status: "Live",
    views: 340,
    price: 89,
  },
  {
    id: "m4",
    title: "Ceramic vase set",
    status: "Pending",
    views: 56,
    price: 45,
  },
  { id: "m5", title: "USB-C hub", status: "Live", views: 210, price: 39 },
  {
    id: "m6",
    title: "Reading lamp",
    status: "Archived",
    views: 400,
    price: 55,
  },
  {
    id: "m7",
    title: "Mechanical keyboard",
    status: "Live",
    views: 512,
    price: 129,
  },
  { id: "m8", title: "Plant stand", status: "Live", views: 88, price: 32 },
];

export async function getAdminUsers() {
  await wait();
  return MOCK_USERS.map((r) => ({ ...r }));
}

export async function getAdminItems() {
  await wait();
  return MOCK_ADMIN_ITEMS.map((r) => ({ ...r }));
}

export async function getCategories() {
  await wait();
  return MOCK_CATEGORIES.map((r) => ({ ...r }));
}

export async function getMyItems() {
  await wait();
  return MOCK_MY_ITEMS.map((r) => ({ ...r }));
}

export async function getReportMetrics() {
  await wait();
  return {
    conversionRate: 3.8,
    avgOrderValue: 86.4,
    returnRate: 1.9,
    series: [
      { week: "W1", orders: 820, refunds: 12 },
      { week: "W2", orders: 910, refunds: 15 },
      { week: "W3", orders: 880, refunds: 11 },
      { week: "W4", orders: 970, refunds: 14 },
      { week: "W5", orders: 1040, refunds: 18 },
      { week: "W6", orders: 1120, refunds: 16 },
    ],
  };
}
