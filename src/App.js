* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f8fafc;
  color: #1e293b;
  min-height: 100vh;
}

.app { max-width: 520px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; }

/* HEADER */
.app-header { background: #fff; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 10; }
.header-inner { padding: 14px 16px 6px; display: flex; justify-content: space-between; align-items: flex-end; }
.header-title { font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 8px; letter-spacing: -0.5px; }
.header-logo { font-size: 20px; }
.header-sub { font-size: 12px; color: #64748b; }

.tabs { display: flex; padding: 0 12px; }
.tab { flex: 1; padding: 10px; border: none; background: none; font-size: 13px; font-weight: 500; color: #94a3b8; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; }
.tab.active { color: #1e293b; border-bottom-color: #7C3AED; }

/* MAIN */
.main { flex: 1; padding: 16px; }

/* WEEK NAV */
.week-nav { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.week-label { font-size: 13px; color: #64748b; font-weight: 500; }
.nav-btn { background: none; border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 12px; font-size: 12px; cursor: pointer; color: #475569; }
.nav-btn:hover { background: #f1f5f9; }

/* SCORE CARDS */
.score-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.score-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 14px; transition: border-color 0.2s; }
.score-name { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.score-num { font-size: 28px; font-weight: 700; line-height: 1; margin-bottom: 8px; }
.score-of { font-size: 16px; font-weight: 400; color: #94a3b8; }
.score-bar-track { height: 6px; background: #f1f5f9; border-radius: 99px; overflow: hidden; margin-bottom: 8px; }
.score-bar-fill { height: 100%; border-radius: 99px; transition: width 0.4s ease; }
.score-badge { font-size: 11px; font-weight: 500; padding: 3px 8px; border-radius: 99px; display: inline-block; }
.score-badge.done { background: #dcfce7; color: #16a34a; }
.score-badge.miss { background: #fef3c7; color: #92400e; }

/* FINE ALERT */
.fine-alert { background: #fef9c3; border: 1px solid #fde047; border-radius: 10px; padding: 10px 14px; font-size: 12px; color: #713f12; margin-bottom: 14px; }

/* LOADING / EMPTY */
.loading, .empty { text-align: center; color: #94a3b8; padding: 32px; font-size: 14px; }

/* DAY ROWS */
.days-list { display: flex; flex-direction: column; gap: 8px; }
.day-row { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 12px; display: flex; gap: 10px; align-items: flex-start; }
.day-row.today { border-color: #7C3AED; border-width: 1.5px; }
.day-info { min-width: 32px; display: flex; flex-direction: column; align-items: center; padding-top: 6px; }
.day-name { font-size: 10px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
.day-date { font-size: 18px; font-weight: 700; color: #1e293b; line-height: 1; }
.day-people { flex: 1; display: flex; gap: 8px; flex-wrap: wrap; }
.day-person-col { flex: 1; min-width: 120px; display: flex; flex-direction: column; gap: 4px; }

.log-btn { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 8px 10px; background: #f8fafc; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s; }
.log-btn:hover { border-color: #cbd5e1; background: #f1f5f9; }
.log-btn.logged { border-width: 1.5px; }
.log-btn-name { font-size: 13px; font-weight: 600; }
.log-btn-plus { font-size: 18px; font-weight: 300; }
.log-btn-ex { font-size: 16px; }

.day-log-detail { display: flex; flex-wrap: wrap; gap: 4px; }
.log-chip { font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 99px; display: flex; align-items: center; gap: 4px; }
.log-del { background: none; border: none; cursor: pointer; font-size: 14px; color: inherit; opacity: 0.5; padding: 0; line-height: 1; }
.log-del:hover { opacity: 1; }

/* HISTORY */
.history-section { }
.section-title { font-size: 15px; font-weight: 700; margin-bottom: 14px; }
.history-list { display: flex; flex-direction: column; gap: 8px; }
.history-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; }
.history-left { display: flex; gap: 10px; align-items: center; }
.history-icon { font-size: 22px; }
.history-ex { font-size: 14px; font-weight: 600; }
.history-date { font-size: 11px; color: #94a3b8; margin-top: 2px; }
.history-right { display: flex; align-items: center; gap: 8px; }
.history-person { font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 99px; }

/* FINES */
.fines-section { }
.rules-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; margin-bottom: 14px; }
.rules-title { font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; }
.rules-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.rules-table th { text-align: left; padding: 6px 8px; color: #94a3b8; font-weight: 600; border-bottom: 1px solid #f1f5f9; }
.rules-table td { padding: 7px 8px; border-bottom: 1px solid #f8fafc; }
.ex-icon { margin-right: 4px; }
.fine-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.fine-card { background: #fff; border: 2px solid; border-radius: 14px; padding: 14px; text-align: center; }
.fine-person { font-size: 13px; font-weight: 700; margin-bottom: 4px; }
.fine-amount { font-size: 20px; font-weight: 800; color: #1e293b; }
.fine-desc { font-size: 11px; color: #94a3b8; margin-top: 4px; }
.review-note { font-size: 12px; color: #64748b; text-align: center; margin-bottom: 14px; }
.this-week-fine { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px; }
.fine-status-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
.fine-status-row:last-child { border-bottom: none; }
.fine-ok { color: #16a34a; font-weight: 600; }
.fine-due { font-weight: 700; }

/* MODAL */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
@media (min-width: 480px) { .modal-overlay { align-items: center; } }
.modal { background: #fff; border-radius: 20px 20px 0 0; padding: 20px 16px 32px; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
@media (min-width: 480px) { .modal { border-radius: 20px; } }
.modal-header { margin-bottom: 16px; }
.modal-title { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
.modal-date { font-size: 12px; color: #94a3b8; }
.modal-section-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
.ex-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
.ex-option { border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 10px; background: #f8fafc; cursor: pointer; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; text-align: left; transition: all 0.15s; }
.ex-option:hover { border-color: #cbd5e1; background: #f1f5f9; }
.ex-option.selected { border-width: 2px; }
.ex-opt-icon { font-size: 20px; margin-bottom: 2px; }
.ex-opt-label { font-size: 12px; font-weight: 600; color: #1e293b; }
.ex-opt-threshold { font-size: 11px; font-weight: 500; }
.notes-input { width: 100%; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 12px; font-size: 14px; margin-bottom: 16px; font-family: inherit; color: #1e293b; }
.notes-input:focus { outline: none; border-color: #7C3AED; }
.modal-actions { display: flex; gap: 8px; }
.btn-cancel { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; font-size: 14px; font-weight: 500; cursor: pointer; color: #64748b; }
.btn-submit { flex: 2; padding: 12px; border: none; border-radius: 10px; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; opacity: 1; transition: opacity 0.15s; }
.btn-submit:disabled { opacity: 0.4; cursor: not-allowed; }
