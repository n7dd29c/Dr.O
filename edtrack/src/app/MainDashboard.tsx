import React from "react";

/**
 * MainDashboard
 * - 추가 라이브러리 없이 node_modules 그대로 사용 가능한 단일 파일 대시보드
 * - 구조만 먼저 확정 → 이후 실제 데이터/차트 라이브러리 연결 예정
 * - Next.js: app/page.tsx 혹은 pages/index.tsx에 넣어도 되고, CRA/Vite: src/App.tsx 대체 가능
 */
export default function MainDashboard() {
  return (
    <div className="wrap">
      {/* Top Bar */}
      <header className="topbar">
        <div className="brand">Dr.O</div>
        <nav className="nav">
          <a className="active" href="#">Dashboard</a>
          <a href="#">Materials</a>
          <a href="#">Classes</a>
          <a href="#">Inbox</a>
          <a href="#">Settings</a>
        </nav>
        <div className="actions">
          <button className="icon" aria-label="search">🔍</button>
          <button className="icon" aria-label="notifications">🔔</button>
          <div className="avatar" aria-label="profile" />
        </div>
      </header>

      {/* Greeting */}
      <section className="greet">
        <div>
          <h1>Hello, Mary!</h1>
          <p>Let's jump into your learning experience</p>
          <div className="meta">
            <div className="pill"><span>★</span> <b>4.1</b> Average rate</div>
            <div className="pill"><span>🗓</span> <b>76%</b> Attendance rate</div>
            <div className="pill"><span>🎯</span> <b>24</b> Lessons completed</div>
          </div>
        </div>
        <aside className="recent">
          <div className="recent-head">
            <h3>Recent activities</h3>
            <button className="ghost">See all →</button>
          </div>
          <ul className="recent-list">
            <li>
              <div className="mini-avatar"/>
              <div className="recent-body">
                <p>Teacher Mr Lopez left a feedback on a <b>“Reflective essay on self”</b></p>
                <small>10:00 | 19/07/2023</small>
              </div>
              <a className="link" href="#">Read it</a>
            </li>
            <li>
              <div className="mini-avatar"/>
              <div className="recent-body">
                <p>Teacher Ms Lynn left a feedback on a <b>“Behavioural report”</b></p>
                <small>16:00 | 18/07/2023</small>
              </div>
              <a className="link" href="#">Read it</a>
            </li>
          </ul>
        </aside>
      </section>

      {/* Grid */}
      <main className="grid">
        {/* Task progress */}
        <section className="card row1">
          <div className="card-head">
            <h3>Task progress</h3>
            <span className="badge">This week</span>
          </div>
          <div className="bars">
            {[
              {label: "Sat", v: 12},
              {label: "Sun", v: 18},
              {label: "Mon", v: 8},
              {label: "Tue", v: 6},
              {label: "Wed", v: 10},
              {label: "Thu", v: 17},
              {label: "Fri", v: 14},
            ].map((d) => (
              <div key={d.label} className="bar">
                <div className="bar-fill" style={{height: `${d.v * 6}px`}} />
                <span className="bar-label">{d.label}</span>
              </div>
            ))}
          </div>
          <div className="legend">
            <span className="dot complete"/> Complete
            <span className="dot pending"/> Pending
          </div>
        </section>

        {/* Assignments */}
        <section className="card row1">
          <div className="card-head">
            <h3>Assignments</h3>
            <button className="ghost">See all →</button>
          </div>
          <ul className="tasks">
            <li className="task done">
              <input type="checkbox" defaultChecked aria-label="done"/>
              <div>
                <p>Human Behaviour – A Study</p>
                <small>18/07/2023</small>
              </div>
              <span className="status ok">Done</span>
            </li>
            <li className="task">
              <input type="checkbox" aria-label="todo"/>
              <div>
                <p>Cognitive psychology: Identify notion of emotions</p>
                <small>19/07/2023</small>
              </div>
              <button className="chip warn">Overdue</button>
              <button className="btn sm">View</button>
            </li>
            <li className="task">
              <input type="checkbox" aria-label="todo"/>
              <div>
                <p>Read “Sense and Sensibility” by Jane Austen</p>
                <small>26/07/2023</small>
              </div>
              <span className="status subtle">On time</span>
            </li>
          </ul>
        </section>

        {/* Attendance */}
        <section className="card row1">
          <div className="card-head">
            <h3>Attendance</h3>
            <span className="badge">This week</span>
          </div>
          <div className="calendar">
            {[
              {d:17,t:"on"}, {d:18,t:"on"}, {d:19,t:"on"}, {d:20,t:"on"}, {d:21,t:"off"}, {d:18,t:"abs"}, {d:19,t:"tardy"}
            ].slice(0,7).map((x,i)=> (
              <div key={i} className={`cal ${x.t}`}>
                {x.d}
              </div>
            ))}
          </div>
          <div className="legend">
            <span className="dot on"/> On time
            <span className="dot abs"/> Absent
            <span className="dot tardy"/> Tardy
          </div>
        </section>

        {/* Grades */}
        <section className="card wide">
          <div className="card-head">
            <h3>Grades</h3>
            <span className="avg"><b>4.1</b> Average grade</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
                <th>Progress</th>
                <th>Lessons</th>
              </tr>
            </thead>
            <tbody>
              {[
                {s:"Human Behaviour", g:4.3, p:0.65, l:37},
                {s:"Cognitive Psychology", g:4.9, p:0.8, l:30},
                {s:"Social Psychology", g:4.0, p:0.5, l:15},
              ].map(row => (
                <tr key={row.s}>
                  <td>{row.s}</td>
                  <td>{row.g.toFixed(1)}</td>
                  <td>
                    <div className="prog"><span style={{width:`${row.p*100}%`}}/></div>
                  </td>
                  <td>{row.l}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Upcoming events */}
        <section className="card">
          <div className="card-head">
            <h3>Upcoming events</h3>
          </div>
          <ul className="timeline">
            <li>
              <div className="time">03:00 pm</div>
              <div className="event purple">
                <p><b>Lesson with Charls Dickenson</b></p>
                <small>Behavioural Psychology</small>
              </div>
            </li>
            <li>
              <div className="time">04:00 pm</div>
              <div className="event blue">
                <p><b>Webinar</b></p>
                <small>New ways of treatment</small>
              </div>
            </li>
          </ul>
        </section>
      </main>

      <style>{`
        :root{
          --bg:#0f1316; --bg-2:#161b20; --bg-3:#1b2128; --card:#1f2630; --text:#eaf1f7; --muted:#a7b0bc; --line:#293241;
          --primary:#8b5cf6; --primary-2:#a78bfa; --blue:#60a5fa; --red:#ef4444; --orange:#f59e0b; --green:#10b981;
          --radius:16px;
        }
        *{box-sizing:border-box}
        html,body,#root{height:100%}
        .wrap{min-height:100vh;background:var(--bg);color:var(--text);font-family:Inter,system-ui,Arial,sans-serif}
        /* Topbar: 하나의 컬러로 통일 & 중앙 탭 정렬 */
        .topbar{height:72px;display:flex;align-items:center;gap:24px;padding:0 24px;border-bottom:1px solid var(--line);background:var(--bg);position:sticky;top:0;z-index:20}
        .brand{font-weight:700;letter-spacing:0.2px;min-width:72px}
        .nav{flex:1;display:flex;justify-content:center;gap:18px}
        .nav a{color:var(--muted);text-decoration:none;padding:8px 12px;border-radius:10px}
        .nav a.active,.nav a:hover{background:var(--bg-2);color:var(--text)}
        .actions{min-width:120px;display:flex;justify-content:flex-end;align-items:center;gap:12px}
        .icon{background:var(--bg-2);border:1px solid var(--line);border-radius:12px;color:var(--text);padding:8px 10px;cursor:pointer}
        .avatar{width:32px;height:32px;background:linear-gradient(135deg,#64748b,#0ea5e9);border-radius:50%}

        /* Greeting: 타이틀 크게 */
        .greet{display:grid;grid-template-columns:1fr 420px;gap:24px;padding:24px}
        .greet h1{margin:0 0 6px 0;font-size:36px;line-height:1.15}
        .greet p{margin:0;color:var(--muted);font-size:14px}
        .meta{display:flex;gap:12px;margin-top:18px;flex-wrap:wrap}
        .pill{display:flex;align-items:center;gap:8px;background:var(--bg-2);border:1px solid var(--line);border-radius:999px;padding:8px 12px;color:var(--muted)}
        .recent{background:var(--bg-2);border:1px solid var(--line);border-radius:var(--radius);padding:16px}
        .recent-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
        .recent-list{display:flex;flex-direction:column;gap:12px;margin:0;padding:0;list-style:none}
        .recent-list li{display:grid;grid-template-columns:32px 1fr auto;gap:12px;align-items:center}
        .mini-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#f97316)}
        .link{color:var(--blue);text-decoration:none}
        .ghost{background:transparent;border:1px solid var(--line);color:var(--muted);border-radius:10px;padding:6px 10px;cursor:pointer}

        /* Grid: 첫 줄 카드 높이 통일 */
        .grid{display:grid;gap:24px;grid-template-columns:1.2fr 1fr 1fr;align-items:stretch;padding:0 24px 36px}
        .card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:16px;display:flex;flex-direction:column}
        .card.wide{grid-column:1 / span 2}
        .row1{min-height:260px}
        .card-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
        .badge{background:var(--bg-3);border:1px solid var(--line);border-radius:999px;color:var(--muted);padding:4px 8px;font-size:12px}
        .avg{color:var(--muted)}

        .bars{display:flex;align-items:end;gap:12px;height:160px;padding:8px 0}
        .bar{display:flex;flex-direction:column;align-items:center;gap:8px}
        .bar-fill{width:18px;border-radius:8px;background:linear-gradient(180deg,var(--primary-2),var(--primary))}
        .bar-label{color:var(--muted);font-size:12px}
        .legend{display:flex;gap:18px;color:var(--muted);font-size:13px;margin-top:8px}
        .dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;background:var(--bg-3);border:1px solid var(--line)}
        .dot.complete{background:var(--primary)} .dot.pending{background:#324055}
        .dot.on{background:var(--green)} .dot.abs{background:var(--red)} .dot.tardy{background:var(--orange)}

        .tasks{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
        .task{display:grid;grid-template-columns:20px 1fr auto auto;gap:12px;align-items:center;background:var(--bg-2);border:1px solid var(--line);padding:10px;border-radius:12px}
        .task.done{opacity:0.6}
        .status{font-size:12px;color:var(--muted)}
        .status.ok{color:var(--green)}
        .status.subtle{color:var(--muted)}
        .chip{border:none;border-radius:999px;padding:6px 10px;font-size:12px;cursor:default}
        .chip.warn{background:rgba(245,158,11,0.15);color:#fbbf24}
        .btn{background:var(--blue);color:#0b1220;border:none;border-radius:8px;padding:8px 12px;cursor:pointer}
        .btn.sm{padding:6px 10px}

        .calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;flex:1}
        .cal{background:var(--bg-2);border:1px solid var(--line);border-radius:10px;padding:10px;text-align:center;color:var(--muted)}
        .cal.on{outline:2px solid var(--green);color:#d1fae5}
        .cal.off{outline:2px solid var(--line)}
        .cal.abs{outline:2px solid var(--red);color:#fecaca}
        .cal.tardy{outline:2px solid var(--orange);color:#ffedd5}

        .table{width:100%;border-collapse:collapse}
        .table th,.table td{border-top:1px solid var(--line);padding:10px;text-align:left}
        .prog{height:8px;background:var(--bg-3);border-radius:999px;overflow:hidden}
        .prog span{display:block;height:100%;background:linear-gradient(90deg,var(--primary),var(--blue))}

        .timeline{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px}
        .timeline li{display:grid;grid-template-columns:90px 1fr;gap:12px;align-items:center}
        .time{color:var(--muted)}
        .event{background:var(--bg-2);border:1px solid var(--line);border-radius:12px;padding:10px}
        .event.purple{border-color:rgba(139,92,246,0.35)}
        .event.blue{border-color:rgba(96,165,250,0.35)}

        /* Responsive */
        @media (max-width:1100px){
          .greet{grid-template-columns:1fr}
          .grid{grid-template-columns:1fr}
          .card.wide{grid-column:auto}
          .row1{min-height:220px}
        }
      `}</style>
    </div>
  );
}
