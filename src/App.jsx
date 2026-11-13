import { useState, useMemo, useEffect } from "react";

const INITIAL_RECORDS = [
  {
    id: "rec-1",
    title: "Election Night Live Coverage",
    category: "Politics",
    turnaroundTime: 4,
    status: "In Progress",
    notes: "Live editorial pipeline optimization for real-time polling updates.",
  },
  {
    id: "rec-2",
    title: "Tech Gadgets Fall Review",
    category: "Technology",
    turnaroundTime: 6,
    status: "Optimized",
    notes: "Image compression and automated review checklist applied.",
  },
  {
    id: "rec-3",
    title: "Global Economic Market Summary",
    category: "Business",
    turnaroundTime: 8,
    status: "Pending",
    notes: "Pending expert commentary and editorial signoff.",
  },
];

const STORAGE_KEY = "news_blog_performance_records";

function sanitizeInput(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export default function App() {
  const [records, setRecords] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Use fallback on storage read error
    }
    return INITIAL_RECORDS;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [simulateDisruption, setSimulateDisruption] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [networkError, setNetworkError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "Technology",
    turnaroundTime: "",
    status: "Pending",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch {
      // Handle storage write error silently
    }
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        rec.title.toLowerCase().includes(query) ||
        rec.notes.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || rec.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const total = filteredRecords.length;
    const optimized = filteredRecords.filter(
      (r) => r.status === "Optimized"
    ).length;
    const avgTurnaround =
      total > 0
        ? (
            filteredRecords.reduce(
              (acc, curr) => acc + Number(curr.turnaroundTime || 0),
              0
            ) / total
          ).toFixed(1)
        : "0.0";
    return { total, optimized, avgTurnaround };
  }, [filteredRecords]);

  const validate = () => {
    const nextErrors = {};
    const cleanTitle = sanitizeInput(form.title);
    const cleanNotes = sanitizeInput(form.notes);
    const turnaroundNum = Number(form.turnaroundTime);

    if (!cleanTitle) {
      nextErrors.title = "Article title is required";
    } else if (cleanTitle.length < 3) {
      nextErrors.title = "Article title must be at least 3 characters";
    }

    if (!form.category) {
      nextErrors.category = "Category is required";
    }

    if (form.turnaroundTime === "" || isNaN(turnaroundNum)) {
      nextErrors.turnaroundTime = "Turnaround time must be a positive number";
    } else if (turnaroundNum <= 0) {
      nextErrors.turnaroundTime = "Turnaround time must be greater than 0";
    }

    if (!form.status) {
      nextErrors.status = "Optimization status is required";
    }

    if (!cleanNotes) {
      nextErrors.notes = "Optimization notes are required";
    } else if (cleanNotes.length < 5) {
      nextErrors.notes = "Notes must be at least 5 characters";
    }

    return nextErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const executeSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);
    setNetworkError(null);

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (simulateDisruption) {
            reject(
              new Error(
                "Network request interrupted. Please check your connection and retry."
              )
            );
          } else {
            resolve();
          }
        }, 100);
      });

      const newRecord = {
        id: "rec-" + Date.now(),
        title: sanitizeInput(form.title),
        category: form.category,
        turnaroundTime: Number(form.turnaroundTime),
        status: form.status,
        notes: sanitizeInput(form.notes),
      };

      setRecords((prev) => [newRecord, ...prev]);
      console.log("[Analytics] User interacted with Performance Optimization");

      setForm({
        title: "",
        category: "Technology",
        turnaroundTime: "",
        status: "Pending",
        notes: "",
      });
      setNetworkError(null);
    } catch (err) {
      setNetworkError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeSave();
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-300">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            News Blog Editorial &amp; Operational Performance Tracker
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Standardized operational performance management for editorial publishing.
          </p>

          <section
            aria-label="Summary Statistics"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
          >
            <div className="bg-slate-50 p-4 border border-slate-200 rounded">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-600 block">
                Total Records
              </span>
              <span className="text-2xl font-bold text-slate-900 mt-1 block">
                {stats.total}
              </span>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-200 rounded">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-600 block">
                Optimized Records
              </span>
              <span className="text-2xl font-bold text-slate-900 mt-1 block">
                {stats.optimized}
              </span>
            </div>

            <div className="bg-slate-50 p-4 border border-slate-200 rounded">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-600 block">
                Average Turnaround
              </span>
              <span className="text-2xl font-bold text-slate-900 mt-1 block">
                {stats.avgTurnaround} hrs
              </span>
            </div>
          </section>
        </div>
      </header>

      <main role="main" className="max-w-6xl mx-auto px-4 py-8">
        <section
          aria-label="Search and Filter Controls"
          className="bg-white p-4 border border-slate-300 rounded mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1">
            <label
              htmlFor="search-records"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
            >
              Search Records
            </label>
            <input
              id="search-records"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or notes..."
              className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            />
          </div>

          <div className="w-full sm:w-64">
            <label
              htmlFor="status-filter"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
            >
              Filter by Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Optimized">Optimized</option>
            </select>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section
            aria-label="Performance Record Submission"
            className="lg:col-span-1 bg-white p-6 border border-slate-300 rounded self-start"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              Log Performance Record
            </h2>

            {networkError && (
              <div
                role="alert"
                className="p-4 bg-slate-100 border border-slate-900 text-slate-900 rounded mb-4"
              >
                <p className="text-sm font-semibold">{networkError}</p>
                <button
                  type="button"
                  onClick={executeSave}
                  className="mt-3 px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  Retry
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label
                  htmlFor="article-title"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                >
                  Article Title
                </label>
                <input
                  id="article-title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleInputChange}
                  aria-invalid={errors.title ? "true" : "false"}
                  aria-describedby={errors.title ? "title-error" : undefined}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                />
                {errors.title && (
                  <p id="title-error" className="text-red-700 text-xs mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  aria-invalid={errors.category ? "true" : "false"}
                  aria-describedby={errors.category ? "category-error" : undefined}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Politics">Politics</option>
                  <option value="Science">Science</option>
                  <option value="Culture">Culture</option>
                </select>
                {errors.category && (
                  <p id="category-error" className="text-red-700 text-xs mt-1">
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="turnaround-time"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                >
                  Turnaround Time (Hours)
                </label>
                <input
                  id="turnaround-time"
                  name="turnaroundTime"
                  type="number"
                  value={form.turnaroundTime}
                  onChange={handleInputChange}
                  aria-invalid={errors.turnaroundTime ? "true" : "false"}
                  aria-describedby={
                    errors.turnaroundTime ? "turnaround-error" : undefined
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                />
                {errors.turnaroundTime && (
                  <p
                    id="turnaround-error"
                    className="text-red-700 text-xs mt-1"
                  >
                    {errors.turnaroundTime}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                >
                  Optimization Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  aria-invalid={errors.status ? "true" : "false"}
                  aria-describedby={errors.status ? "status-error" : undefined}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Optimized">Optimized</option>
                </select>
                {errors.status && (
                  <p id="status-error" className="text-red-700 text-xs mt-1">
                    {errors.status}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                >
                  Optimization Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleInputChange}
                  aria-invalid={errors.notes ? "true" : "false"}
                  aria-describedby={errors.notes ? "notes-error" : undefined}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                />
                {errors.notes && (
                  <p id="notes-error" className="text-red-700 text-xs mt-1">
                    {errors.notes}
                  </p>
                )}
              </div>

              <div className="mb-6 flex items-center gap-2">
                <input
                  id="network-disruption"
                  type="checkbox"
                  checked={simulateDisruption}
                  onChange={(e) => setSimulateDisruption(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                />
                <label
                  htmlFor="network-disruption"
                  className="text-xs text-slate-700 cursor-pointer"
                >
                  Simulate Network Disruption
                </label>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                aria-busy={isSaving ? "true" : "false"}
                className="w-full py-2.5 px-4 bg-slate-900 text-white rounded font-medium text-sm hover:bg-slate-800 disabled:bg-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 transition-colors"
              >
                {isSaving ? "Saving..." : "Save Record"}
              </button>
            </form>
          </section>

          <section
            aria-label="Performance Records List"
            className="lg:col-span-2"
          >
            {filteredRecords.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-slate-300 rounded bg-white">
                <p className="text-slate-700 font-medium">
                  No performance records found.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try adjusting your search criteria or reset filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-4 px-4 py-2 border border-slate-300 bg-white text-slate-800 rounded text-sm hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRecords.map((rec) => (
                  <article
                    key={rec.id}
                    className="p-5 bg-white border border-slate-300 rounded"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-2">
                          {rec.category}
                        </span>
                        <h3 className="text-base font-semibold text-slate-900 inline-block">
                          {rec.title}
                        </h3>
                      </div>
                      <span
                        data-testid="record-status-badge"
                        className="inline-flex items-center self-start sm:self-auto px-2.5 py-0.5 rounded text-xs font-semibold border border-slate-300 bg-slate-100 text-slate-800"
                      >
                        {rec.status}
                      </span>
                    </div>

                    <div className="text-sm text-slate-600 mb-2">
                      <span className="font-medium text-slate-700">
                        Turnaround:
                      </span>{" "}
                      {rec.turnaroundTime} hrs
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {rec.notes}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
