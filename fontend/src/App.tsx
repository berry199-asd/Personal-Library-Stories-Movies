import { useState, useEffect, type ReactNode } from "react";

const photos = {
  hero: "https://images.unsplash.com/photo-1501769752-a59efa2298ce?auto=format&fit=crop&w=1800&q=85",
  red: "https://images.unsplash.com/photo-1600685842444-5fd946f0d09c?auto=format&fit=crop&w=800&q=85",
  rain: "https://images.unsplash.com/photo-1660477703315-516fe0575770?auto=format&fit=crop&w=800&q=85",
  lantern: "https://images.unsplash.com/photo-1573455494057-12684d151bf4?auto=format&fit=crop&w=800&q=85",
  alley: "https://images.unsplash.com/photo-1634351440426-020152a2a495?auto=format&fit=crop&w=800&q=85",
  street: "https://images.unsplash.com/photo-1535913917396-518c020c6a1f?auto=format&fit=crop&w=800&q=85",
  city: "https://images.unsplash.com/photo-1604315841269-a1f298321670?auto=format&fit=crop&w=800&q=85",
};

type IconName =
  | "search" | "bell" | "chevron" | "arrow" | "plus" | "play" | "book"
  | "heart" | "share" | "flag" | "message" | "check" | "filter" | "grid"
  | "send" | "users" | "lock" | "more" | "x" | "settings" | "edit";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    arrow: <path d="M5 19 19 5m-9 0h9v9" />,
    plus: <path d="M12 5v14M5 12h14" />,
    play: <path d="m8 5 11 7-11 7z" />,
    book: <><path d="M4 5a3 3 0 0 1 3-3h13v18H7a3 3 0 0 0-3 2z" /><path d="M4 5v17" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z" />,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></>,
    flag: <><path d="M5 22V4" /><path d="M5 4h12l-2 4 2 4H5" /></>,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />,
    check: <path d="m5 12 4 4L19 6" />,
    filter: <path d="M4 5h16M7 12h10M10 19h4" />,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    x: <path d="m6 6 12 12M18 6 6 18" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" /></>,
    edit: <><path d="M12 20h9" /><path d="m16.5 3.5 4 4L8 20l-5 1 1-5z" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, className = "" }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; className?: string }) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick}>{icon && <Icon name={icon} size={17} />}<span>{children}</span></button>;
}

function Rating({ value = "4.8", personal = false }: { value?: string; personal?: boolean }) {
  return <div className={personal ? "personal-rating" : "rating"}><span>★</span>{personal ? "★★★★☆" : `${value} / 5`}</div>;
}

function Brand() {
  return <div className="brand"><div className="brand-mark"><span>M</span></div><div><b>Mê Truyện</b><small>STORIES UNBOUND</small></div></div>;
}

type NotificationItem = { id: number; type: "CHAPTER" | "COMMENT" | "SHARE" | "FRIEND"; icon: string; text: string; targetTitle: string; time: string; unread: boolean; targetPage: string };

function Navbar({
  page,
  setPage,
  userRole,
  onSwitchRole,
  onOpenSearch,
  notifications,
  onMarkAllRead,
  onReadNotification,
}: {
  page: string;
  setPage: (page: string) => void;
  userRole: "USER" | "ADMIN";
  onSwitchRole: (role: "USER" | "ADMIN") => void;
  onOpenSearch: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onReadNotification: (n: NotificationItem) => void;
}) {
  const [notice, setNotice] = useState(false);
  const [noticeTab, setNoticeTab] = useState<"ALL" | "CHAPTER" | "COMMENT" | "SHARE">("ALL");
  const [accountOpen, setAccountOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;
  const shownNotices = notifications.filter(n => noticeTab === "ALL" || n.type === noticeTab);

  // Mục "Quản trị" CHỈ xuất hiện khi tài khoản có vai trò ADMIN
  const navItems: [string, string][] = [
    ["home", "Trang chủ"],
    ["manga", "Truyện"],
    ["movies", "Phim"],
    ["library", "Thư viện của tôi"],
    ["chat", "Tin nhắn"],
    ...(userRole === "ADMIN" ? ([["admin", "Quản trị"]] as [string, string][]) : []),
  ];

  return <header className="navbar">
    <Brand />
    <nav className="navlinks">
      {navItems.map(([id, label], i) =>
        <button key={`${label}-${i}`} className={page === id ? "active" : ""} onClick={() => setPage(id)}>
          {id === "chat" && <Icon name="message" size={14} />}
          {id === "admin" && <Icon name="settings" size={14} />}
          {label}
        </button>
      )}
    </nav>
    <div className="nav-actions">
      <button className="searchbox" onClick={onOpenSearch} title="Nhấn Ctrl + K để tìm kiếm nhanh">
        <Icon name="search" size={17} />
        <span style={{ flex: 1, textAlign: "left", fontSize: "12px", color: "#8c829b" }}>Tìm truyện, phim, @user...</span>
        <kbd>Ctrl K</kbd>
      </button>
      <div className="notice-wrap">
        <button className="icon-btn" onClick={() => setNotice(!notice)} title="Thông báo">
          <Icon name="bell" />
          {unreadCount > 0 && <i />}
        </button>
        {notice && <div className="notice-pop">
          <div className="pop-title">
            <span>Thông báo ({unreadCount} chưa đọc)</span>
            <button onClick={onMarkAllRead} style={{ border: 0, background: "none", color: "#a980ff", fontSize: "9px", fontWeight: 600 }}>Đánh dấu đã đọc</button>
          </div>
          <div className="notice-tabs">
            {([["ALL", "Tất cả"], ["CHAPTER", "Chương mới"], ["SHARE", "Chia sẻ"], ["COMMENT", "Bình luận"]] as const).map(([key, label]) =>
              <button key={key} className={noticeTab === key ? "active" : ""} onClick={() => setNoticeTab(key)}>{label}</button>
            )}
          </div>
          <div style={{ maxHeight: "260px", overflowY: "auto" }}>
            {shownNotices.map(item => <div
              key={item.id}
              className={`notice-item ${item.unread ? "unread" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => { onReadNotification(item); setNotice(false); }}
            >
              <div className={`notice-icon ${item.type === "COMMENT" || item.type === "SHARE" ? "alt" : ""}`}>{item.icon}</div>
              <p><b>{item.targetTitle}</b> {item.text}<small>{item.time}</small></p>
            </div>)}
          </div>
          <div className="notice-footer">
            <button onClick={() => { setNotice(false); setPage("notifications"); }}>Xem tất cả thông báo →</button>
          </div>
        </div>}
      </div>
      <div className="account-wrap">
        <button className="avatar" onClick={() => setAccountOpen(!accountOpen)}><img src={photos.red} alt="Ảnh đại diện" /><i /></button>
        {accountOpen && <div className="account-menu">
          <div className="account-summary">
            <img src={photos.red} alt="" />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <b>{userRole === "ADMIN" ? "Nguyễn Huy" : "Lan Anh"}</b>
                <span className={`badge-pill ${userRole === "ADMIN" ? "role-admin" : "active"}`}>{userRole}</span>
              </div>
              <span>{userRole === "ADMIN" ? "@admin_huy" : "@lananh"}</span>
            </div>
          </div>
          <button onClick={() => { setPage("account"); setAccountOpen(false); }}><Icon name="users" size={16} />Thông tin tài khoản</button>
          <button onClick={() => { setPage("public-profile"); setAccountOpen(false); }}><Icon name="share" size={16} />Thư viện công khai</button>
          <button onClick={() => { setPage("notifications"); setAccountOpen(false); }}><Icon name="bell" size={16} />Trung tâm thông báo</button>
          {userRole === "ADMIN" && (
            <button onClick={() => { setPage("admin"); setAccountOpen(false); }}><Icon name="settings" size={16} />Bảng điều khiển Quản trị</button>
          )}
          <button onClick={() => { setPage("settings"); setAccountOpen(false); }}><Icon name="settings" size={16} />Setting</button>
          <button
            style={{ color: "#c4a5ff", borderTop: "1px solid #2b2236", marginTop: "4px", paddingTop: "8px" }}
            onClick={() => {
              const nextRole = userRole === "ADMIN" ? "USER" : "ADMIN";
              onSwitchRole(nextRole);
              setAccountOpen(false);
            }}
          >
            <Icon name="lock" size={16} />
            {userRole === "ADMIN" ? "Chuyển sang quyền USER" : "Chuyển sang quyền ADMIN"}
          </button>
          <button className="logout" onClick={() => { setPage("login"); setAccountOpen(false); }}><Icon name="arrow" size={16} />Đăng xuất</button>
        </div>}
      </div>
    </div>
  </header>;
}

type PublishedChapterItem = {
  id: number;
  season: string;
  number: string;
  title: string;
  url: string;
  note: string;
};

type ContentItem = {
  title: string;
  sub: string;
  img: string;
  status: string;
  score: string;
  type: "Truyện" | "Phim";
  genres: string[];
  sharedFrom?: { name: string; user: string; sharedAt?: string };
  createdBy?: { name: string; user: string };
  description?: string;
  mainLink?: string;
  visibility?: "PUBLIC" | "SHARED" | "PRIVATE";
  updatedAt?: string;
  chaptersList?: PublishedChapterItem[];
};

const defaultChaptersFor = (title: string, isMovie: boolean): PublishedChapterItem[] => [
  { id: 1, season: "Mùa 1", number: "1", title: isMovie ? `Tập 1: Mở màn ${title}` : "Chương 1: Khởi đầu hành trình", url: isMovie ? "https://www.netflix.com" : "https://mangadex.org", note: "Bản chính thức" },
  { id: 2, season: "Mùa 1", number: "2", title: isMovie ? "Tập 2: Dấu vết trong mưa" : "Chương 2: Bí mật trong đêm", url: isMovie ? "https://www.netflix.com" : "https://mangadex.org", note: "Đã cập nhật link" },
  { id: 3, season: "Mùa 1", number: isMovie ? "3" : "10.5", title: isMovie ? "Tập 3: Cao trào" : "Chương 10.5: Màn đêm buông xuống", url: isMovie ? "https://www.netflix.com" : "https://mangadex.org", note: "Mới cập nhật" },
];

const libraryItems: ContentItem[] = [
  {
    title: "Nightfall City",
    sub: "S. Kuroda",
    img: photos.red,
    status: "Đang đọc / xem",
    score: "4.9",
    type: "Truyện",
    genres: ["Action", "Mystery", "Sci-Fi"],
    createdBy: { name: "Nguyễn Huy", user: "@huynguyen" },
    visibility: "PUBLIC",
    mainLink: "https://mangadex.org",
    updatedAt: "Hôm nay",
    description: "Trong một Tokyo tương lai nơi ký ức được mã hóa và mua bán, thám tử Rei Nakamura tỉnh dậy mà không còn quá khứ.",
    chaptersList: defaultChaptersFor("Nightfall City", false),
  },
  {
    title: "Thành Phố Mưa",
    sub: "Anime Series",
    img: photos.rain,
    status: "Đang ra",
    score: "4.7",
    type: "Phim",
    genres: ["Animation", "Drama", "Romance"],
    createdBy: { name: "Nguyễn Huy", user: "@huynguyen" },
    visibility: "PUBLIC",
    mainLink: "https://www.netflix.com",
    updatedAt: "2 giờ trước",
    description: "Bộ anime chữa lành kể về những cuộc gặp gỡ tình cờ dưới hiên ga tàu mỗi chiều mưa tầm tã.",
    chaptersList: defaultChaptersFor("Thành Phố Mưa", true),
  },
  {
    title: "Lồng Đèn Đỏ",
    sub: "Yuki Nakama",
    img: photos.lantern,
    status: "Hoàn thành",
    score: "4.8",
    type: "Truyện",
    genres: ["Historical", "Mystery", "Supernatural"],
    sharedFrom: { name: "Lan Anh", user: "@lananh", sharedAt: "Hôm qua" },
    createdBy: { name: "Lan Anh", user: "@lananh" },
    visibility: "PUBLIC",
  },
  {
    title: "Ký Ức Ngõ Hẻm",
    sub: "Movie · 2024",
    img: photos.alley,
    status: "Đang ra",
    score: "4.6",
    type: "Phim",
    genres: ["Crime", "Psychological", "Thriller"],
    sharedFrom: { name: "Minh Trần", user: "@minhtran", sharedAt: "2 ngày trước" },
    createdBy: { name: "Minh Trần", user: "@minhtran" },
    visibility: "PUBLIC",
  },
  {
    title: "Ngày Ta Gặp Lại",
    sub: "M. Tanaka",
    img: photos.street,
    status: "Hoàn thành",
    score: "4.9",
    type: "Truyện",
    genres: ["Romance", "Slice of Life", "Josei"],
    sharedFrom: { name: "Thu Hà", user: "@hanguyen", sharedAt: "3 ngày trước" },
    createdBy: { name: "Thu Hà", user: "@hanguyen" },
    visibility: "PUBLIC",
  },
  {
    title: "Ánh Sáng Cuối Hè",
    sub: "Movie · 2023",
    img: photos.city,
    status: "Drop",
    score: "4.3",
    type: "Phim",
    genres: ["Drama", "Family"],
    createdBy: { name: "Tuấn Minh", user: "@tuanminh" },
    visibility: "PUBLIC",
  },
  {
    title: "Võ Đài Linh Hồn",
    sub: "K. Yamato",
    img: photos.hero,
    status: "Đang ra",
    score: "4.5",
    type: "Truyện",
    genres: ["Action", "Martial Arts", "Shounen"],
    createdBy: { name: "Nguyễn Huy", user: "@huynguyen" },
    visibility: "PUBLIC",
    mainLink: "https://mangadex.org",
    updatedAt: "Hôm qua",
    description: "Hành trình vươn tới đỉnh cao võ đạo của thiếu niên mang trong mình linh hồn hộ vệ cổ đại.",
    chaptersList: defaultChaptersFor("Võ Đài Linh Hồn", false),
  },
  {
    title: "Phía Sau Hoàng Hôn",
    sub: "Movie · 2025",
    img: photos.lantern,
    status: "Đang đọc / xem",
    score: "4.7",
    type: "Phim",
    genres: ["Mystery", "Sci-Fi"],
    sharedFrom: { name: "Tuấn Minh", user: "@tuanminh", sharedAt: "5 ngày trước" },
    createdBy: { name: "Tuấn Minh", user: "@tuanminh" },
    visibility: "SHARED",
  },
  {
    title: "Học Viện Ánh Trăng",
    sub: "A. Mori",
    img: photos.rain,
    status: "Đang ra",
    score: "4.4",
    type: "Truyện",
    genres: ["School Life", "Fantasy", "Shoujo"],
    createdBy: { name: "Nguyễn Huy", user: "@huynguyen" },
    visibility: "SHARED",
    mainLink: "https://mangadex.org",
    updatedAt: "3 ngày trước",
    description: "Ngôi trường phép thuật chỉ mở cổng khi trăng tròn, nơi các học viên nắm giữ sức mạnh tinh tú.",
    chaptersList: defaultChaptersFor("Học Viện Ánh Trăng", false),
  },
  {
    title: "Bản Giao Hưởng Cuối",
    sub: "Movie · 2022",
    img: photos.street,
    status: "Hoàn thành",
    score: "4.8",
    type: "Phim",
    genres: ["Musical", "Romance"],
    sharedFrom: { name: "Lan Anh", user: "@lananh", sharedAt: "1 tuần trước" },
    createdBy: { name: "Lan Anh", user: "@lananh" },
    visibility: "PUBLIC",
  },
  {
    title: "Thành Phố Không Ngủ",
    sub: "Movie · 2024",
    img: photos.lantern,
    status: "Muốn đọc / xem",
    score: "4.7",
    type: "Phim",
    genres: ["Sci-Fi", "Mystery", "Drama"],
    sharedFrom: { name: "Lan Anh", user: "@lananh", sharedAt: "Lưu từ khung Chat" },
    createdBy: { name: "Lan Anh", user: "@lananh" },
    visibility: "PUBLIC",
  },
];

const mangaGenres = ["BL", "BG", "GL", "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Historical", "Horror", "Mystery", "Psychological", "Romance", "School Life", "Slice of Life", "Supernatural", "Thriller", "Martial Arts", "Isekai", "Sci-Fi", "Sports", "Shounen", "Shoujo", "Seinen", "Josei"];
const movieGenres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Historical", "Horror", "Mystery", "Musical", "Romance", "Sci-Fi", "Thriller", "War", "Western", "Family", "Psychological", "Supernatural"];
const allGenres = Array.from(new Set([...mangaGenres, ...movieGenres]));

function SectionTitle({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-title"><div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>{action && <button onClick={onAction}>{action} <Icon name="arrow" size={15} /></button>}</div>;
}

function FavoriteButton({ active, toggle }: { active: boolean; toggle: () => void }) {
  return <button className={`favorite-btn ${active ? "active" : ""}`} onClick={e => { e.stopPropagation(); toggle(); }} aria-label={active ? "Bỏ yêu thích" : "Thêm yêu thích"}><Icon name="heart" size={17} /></button>;
}

const catalogItems: ContentItem[] = [
  ...libraryItems,
  { title: "Hành Tinh Ánh Sáng", sub: "Movie · 2025", img: photos.city, status: "Đang ra", score: "4.9", type: "Phim", genres: ["Sci-Fi", "Adventure", "Drama"] },
  { title: "Khúc Nhạc Đêm Mưa", sub: "R. Shinkai", img: photos.rain, status: "Muốn đọc / xem", score: "4.8", type: "Truyện", genres: ["Romance", "Slice of Life", "Drama"] },
  { title: "Bóng Ma Đường Tàu", sub: "H. Sato", img: photos.alley, status: "Đang ra", score: "4.7", type: "Truyện", genres: ["Mystery", "Supernatural", "Thriller"] },
];

function FilterCollection({
  initialType = "Tất cả",
  favorites,
  toggleFavorite,
  setPage,
  compact = false,
  search = "",
  savedItems = libraryItems,
  onSelectContent,
  onToggleLibraryItem,
}: {
  initialType?: string;
  favorites: string[];
  toggleFavorite: (title: string) => void;
  setPage: (page: string) => void;
  compact?: boolean;
  search?: string;
  savedItems?: ContentItem[];
  onSelectContent?: (item: ContentItem) => void;
  onToggleLibraryItem?: (item: ContentItem) => void;
}) {
  const [type, setType] = useState(initialType);
  const [status, setStatus] = useState("Tất cả");
  const [genres, setGenres] = useState<string[]>([]);
  const availableGenres = type === "Truyện" ? mangaGenres : type === "Phim" ? movieGenres : allGenres;
  const sourcePool = Array.from(new Map([...savedItems, ...catalogItems].map(item => [item.title, item])).values());
  const filtered = sourcePool.filter(
    item =>
      item.title.toLocaleLowerCase("vi").includes(search.toLocaleLowerCase("vi")) &&
      (type === "Tất cả" || item.type === type) &&
      (status === "Tất cả" || item.status === status) &&
      genres.every(g => item.genres.includes(g))
  );
  const chooseType = (value: string) => {
    setType(value);
    setGenres(current => current.filter(g => (value === "Truyện" ? mangaGenres : value === "Phim" ? movieGenres : allGenres).includes(g)));
  };
  const reset = () => {
    setType(initialType);
    setStatus("Tất cả");
    setGenres([]);
  };
  return <div className={`filter-collection ${compact ? "compact" : ""}`}>
    <div className="advanced-filter">
      <div className="filter-group"><span>LOẠI</span><div>{["Tất cả", "Truyện", "Phim"].map(x => <button className={type === x ? "active" : ""} onClick={() => chooseType(x)} key={x}>{x}</button>)}</div></div>
      <div className="filter-group status-filter"><span>TRẠNG THÁI</span><div>{["Tất cả", "Đang ra", "Hoàn thành", "Drop", "Đang đọc / xem"].map(x => <button className={status === x ? "active" : ""} onClick={() => setStatus(x)} key={x}>{x}</button>)}</div></div>
      <button className="reset-filter" onClick={reset}><Icon name="x" size={14} /> Xóa bộ lọc</button>
      <div className="genre-filter"><span>THỂ LOẠI <small>Chọn nhiều thể loại</small></span><div>{availableGenres.map(g => <button className={genres.includes(g) ? "active" : ""} onClick={() => setGenres(genres.includes(g) ? genres.filter(x => x !== g) : [...genres, g])} key={g}>{g}</button>)}</div></div>
    </div>
    {(type !== initialType || status !== "Tất cả" || genres.length > 0) && <div className="active-filters"><span>ĐANG LỌC</span>{type !== initialType && <button onClick={() => chooseType(initialType)}>{type} ×</button>}{status !== "Tất cả" && <button onClick={() => setStatus("Tất cả")}>{status} ×</button>}{genres.map(g => <button onClick={() => setGenres(genres.filter(x => x !== g))} key={g}>{g} ×</button>)}</div>}
    <div className="result-count"><b>{filtered.length}</b> tác phẩm phù hợp</div>
    {filtered.length ? <div className="poster-grid">{filtered.map(item => {
      const inLib = savedItems.some(x => x.title === item.title);
      return (
        <article
          className="poster-card"
          key={item.title}
          onClick={() => {
            onSelectContent?.(item);
            setPage("detail");
          }}
        >
          <div className="poster-image">
            <img src={item.img} alt={item.title} />
            <span className={`status ${item.status === "Hoàn thành" ? "done" : item.status === "Drop" ? "drop" : ""}`}>{item.status}</span>
            <FavoriteButton active={favorites.includes(item.title)} toggle={() => toggleFavorite(item.title)} />
          </div>
          <div className="poster-copy">
            <div className="content-type">{item.type === "Truyện" ? "MANGA" : "MOVIE"}</div>
            <h3>{item.title}</h3>
            <div className="card-genres">{item.genres.slice(0, 2).map(g => <span key={g}>{g}</span>)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", marginTop: "4px" }}>
              <Rating value={item.score} />
              {onToggleLibraryItem && (
                <button
                  type="button"
                  className={`quick-lib-btn ${inLib ? "saved" : ""}`}
                  onClick={e => {
                    e.stopPropagation();
                    onToggleLibraryItem(item);
                  }}
                  title={inLib ? "Đã có trong Thư viện của tôi (Nhấn để gỡ)" : "Lưu nhanh vào Thư viện của tôi"}
                >
                  <Icon name={inLib ? "check" : "plus"} size={13} />
                  {inLib ? "Đã lưu" : "Lưu"}
                </button>
              )}
            </div>
          </div>
        </article>
      );
    })}</div> : <div className="empty-results"><Icon name="search" size={28} /><b>Không tìm thấy tác phẩm phù hợp</b><p>Hãy thử bỏ bớt thể loại hoặc đặt lại bộ lọc.</p><Button variant="secondary" onClick={reset}>Đặt lại bộ lọc</Button></div>}
  </div>;
}

type ContinueEntry = {
  item: ContentItem;
  currentUnit: number;
  totalUnits: number;
  unitLabel: "Chương" | "Tập";
  chapterTitle: string;
  synopsis: string;
  lastReadAt: string;
};

function HomePage({
  setPage,
  favorites,
  toggleFavorite,
  savedItems = libraryItems,
  onSaveToLibrary,
  onRemoveFromLibrary,
  onSelectContent,
}: {
  setPage: (page: string) => void;
  favorites: string[];
  toggleFavorite: (title: string) => void;
  savedItems?: ContentItem[];
  onSaveToLibrary?: (item: ContentItem, options?: { status: string; category: string; note: string; favorite: boolean }) => void;
  onRemoveFromLibrary?: (title: string) => void;
  onSelectContent?: (item: ContentItem) => void;
}) {
  const heroSlides: Array<{
    titleLine1: string;
    titleLine2: string;
    eyebrow: string;
    desc: string;
    bg: string;
    item: ContentItem;
  }> = [
    {
      titleLine1: "NIGHTFALL",
      titleLine2: "CITY",
      eyebrow: "Đề xuất cho bạn",
      desc: "Trong một Tokyo nơi ký ức được mua bán như tiền tệ, một thám tử trẻ phải lần theo dấu vết của quá khứ đã bị đánh cắp trước khi thành phố chìm vào bóng tối.",
      bg: photos.hero,
      item: libraryItems[0],
    },
    {
      titleLine1: "HÀNH TINH",
      titleLine2: "ÁNH SÁNG",
      eyebrow: "Phim mới thịnh hành",
      desc: "Một chuyến tàu xuyên ngân hà chở theo những ký ức cuối cùng của Trái Đất, nơi hai kẻ xa lạ phát hiện ra tần số bí ẩn nối liền hai thế giới.",
      bg: photos.city,
      item: catalogItems[libraryItems.length],
    },
    {
      titleLine1: "LỒNG ĐÈN",
      titleLine2: "ĐỎ",
      eyebrow: "Tác phẩm được chia sẻ nhiều nhất",
      desc: "Giữa phố cổ Kyoto ngập tràn ánh đèn lồng đỏ, tiệm trà nhỏ chỉ mở cửa vào lúc nửa đêm để lắng nghe tâm sự của những linh hồn chưa thể siêu thoát.",
      bg: photos.lantern,
      item: libraryItems[2],
    },
    {
      titleLine1: "KHÚC NHẠC",
      titleLine2: "ĐÊM MƯA",
      eyebrow: "Góc chữa lành cuối tuần",
      desc: "Cơn mưa đầu mùa vô tình giữ chân hai tâm hồn cô đơn dưới mái hiên ga tàu cũ, mở ra một mùa hè ngập tràn giai điệu dương cầm và những lời hẹn ước.",
      bg: photos.rain,
      item: catalogItems[libraryItems.length + 1],
    },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const currentHero = heroSlides[heroIndex];
  const isHeroInLibrary = savedItems.some(x => x.title === currentHero.item.title);

  // State cho danh sách "Đang tiếp tục đọc / xem"
  const [continueList, setContinueList] = useState<ContinueEntry[]>([
    {
      item: libraryItems[0],
      currentUnit: 85,
      totalUnits: 100,
      unitLabel: "Chương",
      chapterTitle: "Màn đêm buông xuống tại Quận 9",
      synopsis: "Rei xâm nhập vào kho lưu trữ ký ức ngầm dưới tháp Shinjuku và phát hiện ra đoạn băng ghi hình từ 10 năm trước.",
      lastReadAt: "15 phút trước",
    },
    {
      item: libraryItems[1],
      currentUnit: 9,
      totalUnits: 12,
      unitLabel: "Tập",
      chapterTitle: "Tiếng mưa bên hiên nhà cũ",
      synopsis: "Cơn bão bất ngờ khiến chuyến tàu cuối ngày bị hoãn, buộc Aoi và Haruto phải đối diện với bức thư chưa từng gửi.",
      lastReadAt: "2 giờ trước",
    },
    {
      item: libraryItems[2],
      currentUnit: 71,
      totalUnits: 100,
      unitLabel: "Chương",
      chapterTitle: "Chiếc đèn lồng thứ bảy",
      synopsis: "Vị khách thứ bảy bước vào tiệm trà cùng chiếc đồng hồ quả quýt đã ngừng chạy từ một thế kỷ trước.",
      lastReadAt: "Hôm qua",
    },
    {
      item: libraryItems[3],
      currentUnit: 11,
      totalUnits: 12,
      unitLabel: "Tập",
      chapterTitle: "Bản ghi âm lúc 0 giờ",
      synopsis: "Manh mối cuối cùng trong con hẻm nhỏ dẫn thám tử Kenji tới căn phòng nơi mọi bí mật bắt đầu.",
      lastReadAt: "2 ngày trước",
    },
  ]);

  // Modal "Lưu vào thư viện"
  const [saveModalItem, setSaveModalItem] = useState<ContentItem | null>(null);
  const [saveStatus, setSaveStatus] = useState("Đang đọc / xem");
  const [saveCategory, setSaveCategory] = useState("Kệ đêm mưa");
  const [savePrivacy, setSavePrivacy] = useState("PRIVATE");
  const [saveFavorite, setSaveFavorite] = useState(true);
  const [saveNote, setSaveNote] = useState("");
  const [homeToast, setHomeToast] = useState("");

  // Modal "Đọc tiếp / Xem tiếp"
  const [activeContinue, setActiveContinue] = useState<ContinueEntry | null>(null);

  const openSaveModal = (item: ContentItem) => {
    setSaveModalItem(item);
    setSaveStatus(item.status || "Đang đọc / xem");
    setSaveCategory(item.type === "Truyện" ? "Đọc cuối tuần" : "Kệ đêm mưa");
    setSavePrivacy("PRIVATE");
    setSaveFavorite(favorites.includes(item.title));
    setSaveNote(`Đã lưu từ Trang chủ (${new Date().toLocaleDateString("vi-VN")}).`);
  };

  const handleConfirmSaveToLibrary = () => {
    if (!saveModalItem) return;
    onSaveToLibrary?.(
      { ...saveModalItem, status: saveStatus },
      { status: saveStatus, category: saveCategory, note: saveNote, favorite: saveFavorite }
    );
    setHomeToast(`Đã lưu “${saveModalItem.title}” (${saveStatus} · #${saveCategory}) vào Thư viện của tôi!`);
    setSaveModalItem(null);
  };

  const updateContinueProgress = (title: string, nextUnit: number) => {
    setContinueList(prev =>
      prev.map(entry => {
        if (entry.item.title !== title) return entry;
        const clamped = Math.max(1, Math.min(entry.totalUnits, nextUnit));
        const updated = {
          ...entry,
          currentUnit: clamped,
          lastReadAt: "Vừa đọc / xem",
        };
        if (activeContinue?.item.title === title) {
          setActiveContinue(updated);
        }
        return updated;
      })
    );
  };

  return <main>
    <section className="hero">
      <img className="hero-bg" src={currentHero.bg} alt="" />
      <div className="hero-fade" />
      <div className="hero-copy">
        <div className="eyebrow"><i /> {currentHero.eyebrow}</div>
        <h1>{currentHero.titleLine1}<br /><em>{currentHero.titleLine2}</em></h1>
        <div className="hero-meta">
          {currentHero.item.genres.slice(0, 3).map(g => <span key={g}>{g}</span>)}
          <Rating value={currentHero.item.score} />
        </div>
        <p>{currentHero.desc}</p>
        <div className="hero-buttons">
          <Button
            icon="play"
            onClick={() => {
              onSelectContent?.(currentHero.item);
              setPage("detail");
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            variant={isHeroInLibrary ? "primary" : "secondary"}
            icon={isHeroInLibrary ? "check" : "plus"}
            onClick={() => openSaveModal(currentHero.item)}
          >
            {isHeroInLibrary ? "Đã lưu trong thư viện · Tuỳ chỉnh" : "Lưu vào thư viện"}
          </Button>
        </div>
        <div className="slider-dots">
          {heroSlides.map((slide, idx) => (
            <i
              key={slide.item.title}
              className={idx === heroIndex ? "active" : ""}
              style={{ cursor: "pointer" }}
              title={slide.item.title}
              onClick={() => setHeroIndex(idx)}
            />
          ))}
          <span>{`0${heroIndex + 1} / 0${heroSlides.length}`}</span>
        </div>
      </div>
      <div className="hero-poster" onClick={() => { onSelectContent?.(currentHero.item); setPage("detail"); }} style={{ cursor: "pointer" }}>
        <img src={currentHero.item.img} alt={currentHero.item.title} />
        <div className="poster-glow" />
      </div>
      <div className="scroll-hint">CUỘN ĐỂ KHÁM PHÁ <span /></div>
    </section>

    <div className="page-shell">
      {homeToast && (
        <div className="success-banner" style={{ marginBottom: "18px" }}>
          <Icon name="check" />
          <div style={{ flex: 1 }}>{homeToast}</div>
          <Button variant="secondary" onClick={() => setPage("library")}>Mở Thư viện của tôi →</Button>
          <button onClick={() => setHomeToast("")}>×</button>
        </div>
      )}

      <section>
        <SectionTitle
          eyebrow="TIẾP NỐI HÀNH TRÌNH"
          title="Đang tiếp tục đọc / xem"
          action="Xem tất cả"
          onAction={() => setPage("library")}
        />
        <div className="continue-grid">
          {continueList.map(entry => {
            const pct = Math.round((entry.currentUnit / entry.totalUnits) * 100);
            const isMovie = entry.item.type === "Phim";
            return (
              <article className="continue-card" key={entry.item.title}>
                <img
                  src={entry.item.img}
                  alt={entry.item.title}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onSelectContent?.(entry.item);
                    setPage("detail");
                  }}
                />
                <div className="continue-info">
                  <div className="type">{isMovie ? "PHIM" : "MANGA"} · <span style={{ color: "#a69bb5", fontWeight: 500 }}>{entry.lastReadAt}</span></div>
                  <h3
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onSelectContent?.(entry.item);
                      setPage("detail");
                    }}
                  >
                    {entry.item.title}
                  </h3>
                  <p>{entry.unitLabel} {entry.currentUnit}/{entry.totalUnits} ({pct}%)</p>
                  <div className="progress"><i style={{ width: `${pct}%` }} /></div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                    <button type="button" onClick={() => setActiveContinue(entry)}>
                      {isMovie ? "Xem tiếp" : "Đọc tiếp"} <Icon name="arrow" size={14} />
                    </button>
                    {entry.currentUnit < entry.totalUnits && (
                      <button
                        type="button"
                        className="continue-plus-btn"
                        title={`Tăng nhanh +1 ${entry.unitLabel}`}
                        onClick={() => {
                          updateContinueProgress(entry.item.title, entry.currentUnit + 1);
                          setHomeToast(`Đã cập nhật tiến độ “${entry.item.title}” lên ${entry.unitLabel} ${entry.currentUnit + 1}/${entry.totalUnits}!`);
                        }}
                      >
                        +1 {entry.unitLabel}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="explore">
        <SectionTitle eyebrow="BỘ SƯU TẬP NỔI BẬT" title="Dành riêng cho bạn" />
        <FilterCollection
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          setPage={setPage}
          compact
          savedItems={savedItems}
          onSelectContent={onSelectContent}
          onToggleLibraryItem={item => {
            const exists = savedItems.some(x => x.title === item.title);
            if (exists) {
              onRemoveFromLibrary?.(item.title);
              setHomeToast(`Đã gỡ “${item.title}” khỏi Thư viện của tôi.`);
            } else {
              openSaveModal(item);
            }
          }}
        />
      </section>
    </div>

    {/* Modal Lưu vào Thư viện từ Trang Chủ */}
    {saveModalItem && (
      <div className="modal-backdrop" onMouseDown={() => setSaveModalItem(null)}>
        <div className="share-modal admin-modal" onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>THƯ VIỆN CÁ NHÂN</span>
              <h2>Lưu vào Thư viện của tôi</h2>
              <p>Tùy chỉnh trạng thái và danh mục cho “<b>{saveModalItem.title}</b>”</p>
            </div>
            <button className="icon-btn" onClick={() => setSaveModalItem(null)}><Icon name="x" /></button>
          </div>

          <div className="home-modal-preview">
            <img src={saveModalItem.img} alt={saveModalItem.title} />
            <div>
              <span className="badge-pill active">{saveModalItem.type === "Truyện" ? "MANGA" : "MOVIE"}</span>
              <h3>{saveModalItem.title}</h3>
              <p>{saveModalItem.sub} · {saveModalItem.genres.join(", ")}</p>
              <Rating value={saveModalItem.score} />
            </div>
          </div>

          <div className="admin-form-grid">
            <label className="admin-field">
              <span>Trạng thái đọc / xem</span>
              <select value={saveStatus} onChange={e => setSaveStatus(e.target.value)}>
                <option value="Đang đọc / xem">📖 Đang đọc / xem</option>
                <option value="Muốn đọc / xem">🔖 Muốn đọc / xem</option>
                <option value="Hoàn thành">✓ Đã hoàn thành</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Xếp vào Danh mục cá nhân</span>
              <select value={saveCategory} onChange={e => setSaveCategory(e.target.value)}>
                <option value="Kệ đêm mưa">☾ Kệ đêm mưa</option>
                <option value="Cyberpunk">◇ Cyberpunk</option>
                <option value="Đọc cuối tuần">◫ Đọc cuối tuần</option>
                <option value="Phim chữa lành">✦ Phim chữa lành</option>
                <option value="Trinh thám">⌕ Trinh thám</option>
                <option value="Xem cùng bạn">♙ Xem cùng bạn</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Quyền hiển thị trong thư viện</span>
              <select value={savePrivacy} onChange={e => setSavePrivacy(e.target.value)}>
                <option value="PRIVATE">▣ Riêng tư (Chỉ mình tôi)</option>
                <option value="SHARED">◎ Chia sẻ cộng đồng (Công khai)</option>
                <option value="PEOPLE">♙ Chia sẻ riêng cho bạn bè</option>
              </select>
            </label>
            <label className="admin-field" style={{ justifyContent: "flex-end" }}>
              <span>Đánh dấu Yêu thích</span>
              <button
                type="button"
                className={`fav-toggle-row ${saveFavorite ? "active" : ""}`}
                onClick={() => setSaveFavorite(!saveFavorite)}
              >
                <Icon name="heart" size={15} />
                {saveFavorite ? "Đã thêm vào Yêu thích ♥" : "Thêm vào Yêu thích"}
              </button>
            </label>
          </div>

          <label className="admin-field" style={{ marginTop: "8px" }}>
            <span>Ghi chú cá nhân</span>
            <textarea
              value={saveNote}
              onChange={e => setSaveNote(e.target.value)}
              placeholder="Ghi lại lý do bạn lưu tác phẩm này hoặc chương/tập muốn bắt đầu..."
            />
          </label>

          <div className="modal-actions">
            {savedItems.some(x => x.title === saveModalItem.title) ? (
              <Button
                variant="danger"
                onClick={() => {
                  onRemoveFromLibrary?.(saveModalItem.title);
                  setHomeToast(`Đã xóa “${saveModalItem.title}” khỏi Thư viện của tôi.`);
                  setSaveModalItem(null);
                }}
              >
                Xóa khỏi thư viện
              </Button>
            ) : <div />}
            <div>
              <Button variant="ghost" onClick={() => setSaveModalItem(null)}>Hủy</Button>
              <Button icon="check" onClick={handleConfirmSaveToLibrary}>
                {savedItems.some(x => x.title === saveModalItem.title) ? "Cập nhật trong thư viện" : "Lưu vào thư viện"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Modal Đọc tiếp / Xem tiếp từ Trang Chủ */}
    {activeContinue && (
      <div className="modal-backdrop" onMouseDown={() => setActiveContinue(null)}>
        <div className="share-modal admin-modal continue-reader-modal" onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>TIẾP NỐI HÀNH TRÌNH · {activeContinue.item.type === "Phim" ? "TRÌNH XEM PHIM" : "TRÌNH ĐỌC TRUYỆN"}</span>
              <h2>{activeContinue.item.title}</h2>
              <p>{activeContinue.unitLabel} {activeContinue.currentUnit}/{activeContinue.totalUnits}: <b>{activeContinue.chapterTitle}</b></p>
            </div>
            <button className="icon-btn" onClick={() => setActiveContinue(null)}><Icon name="x" /></button>
          </div>

          <div className="reader-preview-box">
            <img src={activeContinue.item.img} alt={activeContinue.item.title} />
            <div className="reader-preview-copy">
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span className="badge-pill active">{activeContinue.unitLabel} {activeContinue.currentUnit} / {activeContinue.totalUnits}</span>
                <span style={{ fontSize: "10px", color: "#a79db8" }}>Tiến độ: {Math.round((activeContinue.currentUnit / activeContinue.totalUnits) * 100)}%</span>
                <span style={{ fontSize: "10px", color: "#34d399" }}>● Đã đồng bộ vị trí đọc/xem</span>
              </div>
              <h4>{activeContinue.chapterTitle}</h4>
              <p>{activeContinue.synopsis}</p>
              <div className="reader-progress-controls">
                <button
                  type="button"
                  className="btn secondary"
                  disabled={activeContinue.currentUnit <= 1}
                  onClick={() => updateContinueProgress(activeContinue.item.title, activeContinue.currentUnit - 1)}
                >
                  ← {activeContinue.unitLabel} trước
                </button>
                <input
                  type="range"
                  min={1}
                  max={activeContinue.totalUnits}
                  value={activeContinue.currentUnit}
                  onChange={e => updateContinueProgress(activeContinue.item.title, Number(e.target.value))}
                />
                <button
                  type="button"
                  className="btn primary"
                  disabled={activeContinue.currentUnit >= activeContinue.totalUnits}
                  onClick={() => updateContinueProgress(activeContinue.item.title, activeContinue.currentUnit + 1)}
                >
                  {activeContinue.unitLabel} tiếp (+1) →
                </button>
              </div>
            </div>
          </div>

          <div className="modal-actions" style={{ marginTop: "14px", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant="secondary"
                icon="check"
                onClick={() => {
                  updateContinueProgress(activeContinue.item.title, activeContinue.totalUnits);
                  setHomeToast(`Chúc mừng! Bạn đã hoàn thành 100% “${activeContinue.item.title}”.`);
                }}
              >
                Đánh dấu Hoàn thành (100%)
              </Button>
              <Button
                variant="ghost"
                icon="arrow"
                onClick={() =>
                  window.open(
                    activeContinue.item.type === "Phim" ? "https://www.netflix.com" : "https://mangadex.org",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                {activeContinue.item.type === "Phim" ? "Mở trên Netflix" : "Đọc trên MangaDex"}
              </Button>
            </div>
            <div>
              <Button variant="ghost" onClick={() => setActiveContinue(null)}>Đóng</Button>
              <Button
                icon="play"
                onClick={() => {
                  const target = activeContinue.item;
                  setActiveContinue(null);
                  onSelectContent?.(target);
                  setPage("detail");
                }}
              >
                Xem chi tiết & Bình luận
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>;
}

function ListingPage({
  mode,
  setPage,
  favorites,
  toggleFavorite,
  savedItems = libraryItems,
  onSelectContent,
  onToggleLibraryItem,
}: {
  mode: "Truyện" | "Phim";
  setPage: (page: string) => void;
  favorites: string[];
  toggleFavorite: (title: string) => void;
  savedItems?: ContentItem[];
  onSelectContent?: (item: ContentItem) => void;
  onToggleLibraryItem?: (item: ContentItem) => void;
}) {
  const [search, setSearch] = useState("");
  return <main className="inner-page listing-page"><div className="page-shell">
    <div className="listing-head"><div><span>KHÁM PHÁ KHÔNG GIỚI HẠN</span><h1>Truyện & Phim</h1><p>Tìm câu chuyện tiếp theo dành cho bạn từ bộ sưu tập manga và điện ảnh được tuyển chọn.</p></div><label><Icon name="search" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên tác phẩm..." /></label></div>
    {search && <div className="search-note">Kết quả tìm kiếm cho “<b>{search}</b>” <button onClick={() => setSearch("")}>Xóa</button></div>}
    <FilterCollection
      initialType={mode}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      setPage={setPage}
      search={search}
      savedItems={savedItems}
      onSelectContent={onSelectContent}
      onToggleLibraryItem={onToggleLibraryItem}
    />
  </div></main>;
}

function ShareModal({ close }: { close: () => void }) {
  const [choice, setChoice] = useState("all");
  return <div className="modal-backdrop" onMouseDown={close}><div className="share-modal" onMouseDown={e => e.stopPropagation()}>
    <div className="modal-head"><div><span>QUYỀN RIÊNG TƯ</span><h2>Cài đặt chia sẻ</h2><p>“Nightfall City”</p></div><button className="icon-btn" onClick={close}><Icon name="x" /></button></div>
    <div className={`share-option ${choice === "all" ? "chosen" : ""}`} onClick={() => setChoice("all")}><div className="share-radio">{choice === "all" && <i />}</div><div className="option-icon globe">◎</div><div><b>Chia sẻ với cộng đồng</b><p>Mọi người đều có thể xem ghi chú và đánh giá của bạn.</p></div></div>
    <div className={`share-option ${choice === "people" ? "chosen" : ""}`} onClick={() => setChoice("people")}><div className="share-radio">{choice === "people" && <i />}</div><div className="option-icon"><Icon name="users" /></div><div><b>Chia sẻ với người cụ thể</b><p>Chỉ những người bạn chọn mới có quyền truy cập.</p></div></div>
    {choice === "people" && <div className="user-picker"><label><Icon name="search" size={16} /><input placeholder="Tìm theo tên hoặc @username" /></label><div><span><img src={photos.rain} alt="" />@lananh <button>×</button></span><span><img src={photos.city} alt="" />@minhthu <button>×</button></span></div></div>}
    <div className="modal-actions"><Button variant="danger" icon="lock">Thu hồi quyền chia sẻ</Button><div><Button variant="ghost" onClick={close}>Hủy</Button><Button onClick={close}>Lưu thay đổi</Button></div></div>
  </div></div>;
}

const CURRENT_USER_HANDLE = "@huynguyen";
const CURRENT_USER_NAME = "Nguyễn Huy";

function canManagePublishedContent(item: ContentItem, userRole: "USER" | "ADMIN"): boolean {
  if (userRole === "ADMIN") return true;
  return item.createdBy?.user === CURRENT_USER_HANDLE;
}

function PublishedWorkEditorModal({
  initialItem,
  userRole,
  onClose,
  onSave,
  onOpenChaptersModal,
}: {
  initialItem: ContentItem;
  userRole: "USER" | "ADMIN";
  onClose: () => void;
  onSave: (oldTitle: string, updated: ContentItem) => void;
  onOpenChaptersModal: (draft: ContentItem) => void;
}) {
  const [draft, setDraft] = useState<ContentItem>({
    ...initialItem,
    description:
      initialItem.description ||
      `Mô tả chi tiết cho tác phẩm “${initialItem.title}” (${initialItem.sub}).`,
    mainLink: initialItem.mainLink || (initialItem.type === "Truyện" ? "https://mangadex.org" : "https://www.netflix.com"),
    visibility: initialItem.visibility || "PUBLIC",
    chaptersList: initialItem.chaptersList || defaultChaptersFor(initialItem.title, initialItem.type === "Phim"),
  });

  const isOwner = initialItem.createdBy?.user === CURRENT_USER_HANDLE;

  const handleCoverUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft(prev => ({ ...prev, img: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="admin-modal-wide" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>
              {isOwner
                ? "✍️ CHỈNH SỬA TRUYỆN / PHIM TÔI ĐĂNG (@huynguyen)"
                : `🛡️ QUYỀN QUẢN TRỊ VIÊN (${userRole}) · CHỈNH SỬA BÀI ĐĂNG CỦA ${initialItem.createdBy?.user || "@user"}`}
            </span>
            <h2>Chỉnh sửa & Cập nhật: {initialItem.title}</h2>
            <p>Cập nhật thông tin gốc, ảnh bìa, trạng thái phát hành, quyền hiển thị và thể loại của tác phẩm.</p>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>

        <div className="admin-form-grid">
          <div className="admin-poster-preview" style={{ position: "relative" }}>
            <img src={draft.img || photos.hero} alt={draft.title} />
            <label className="upload-cover-overlay">
              📷 Đổi ảnh bìa
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleCoverUpload(e.target.files?.[0])} />
            </label>
          </div>
          <div>
            <div className="admin-field-two">
              <label className="admin-field">
                <span>Tên Truyện / Phim *</span>
                <input
                  value={draft.title}
                  onChange={e => setDraft({ ...draft, title: e.target.value })}
                  placeholder="Nhập tên tác phẩm..."
                />
              </label>
              <label className="admin-field">
                <span>Tác giả / Đạo diễn / Năm</span>
                <input
                  value={draft.sub}
                  onChange={e => setDraft({ ...draft, sub: e.target.value })}
                  placeholder="VD: S. Kuroda hoặc Movie · 2025"
                />
              </label>
            </div>
            <div className="admin-field-row">
              <label className="admin-field">
                <span>Loại nội dung</span>
                <select value={draft.type} onChange={e => setDraft({ ...draft, type: e.target.value as "Truyện" | "Phim" })}>
                  <option value="Truyện">Truyện (MANGA)</option>
                  <option value="Phim">Phim (MOVIE)</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Trạng thái phát hành</span>
                <select value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value })}>
                  <option value="Đang ra">Đang cập nhật (ONGOING)</option>
                  <option value="Đang đọc / xem">Đang đọc / xem</option>
                  <option value="Hoàn thành">Đã hoàn thành (COMPLETED)</option>
                  <option value="Drop">Tạm ngưng (HIATUS / DROP)</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Quyền hiển thị bài đăng</span>
                <select
                  value={draft.visibility || "PUBLIC"}
                  onChange={e => setDraft({ ...draft, visibility: e.target.value as "PUBLIC" | "SHARED" | "PRIVATE" })}
                >
                  <option value="PUBLIC">Công khai (PUBLIC)</option>
                  <option value="SHARED">Chia sẻ cộng đồng (SHARED)</option>
                  <option value="PRIVATE">Riêng tư (PRIVATE)</option>
                </select>
              </label>
            </div>
            <div className="admin-field-two">
              <label className="admin-field">
                <span>URL Ảnh bìa / Poster</span>
                <input value={draft.img} onChange={e => setDraft({ ...draft, img: e.target.value })} />
              </label>
              <label className="admin-field">
                <span>Đường dẫn đọc / xem chính</span>
                <input
                  value={draft.mainLink || ""}
                  onChange={e => setDraft({ ...draft, mainLink: e.target.value })}
                  placeholder="https://..."
                />
              </label>
            </div>
          </div>
        </div>

        <label className="admin-field">
          <span>Mô tả chi tiết tác phẩm</span>
          <textarea
            value={draft.description || ""}
            onChange={e => setDraft({ ...draft, description: e.target.value })}
            placeholder="Nhập nội dung tóm tắt, giới thiệu chi tiết cho bộ truyện hoặc phim..."
          />
        </label>

        <div className="admin-field">
          <span>Thể loại ({draft.genres.length} đã chọn)</span>
          <div className="admin-genre-picks">
            {allGenres.slice(0, 20).map(g => (
              <button
                key={g}
                type="button"
                className={draft.genres.includes(g) ? "active" : ""}
                onClick={() => {
                  const next = draft.genres.includes(g) ? draft.genres.filter(x => x !== g) : [...draft.genres, g];
                  setDraft({ ...draft, genres: next });
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <Button
            variant="secondary"
            icon="plus"
            onClick={() => onOpenChaptersModal(draft)}
          >
            📑 Quản lý Chương / Tập ({(draft.chaptersList || []).length})
          </Button>
          <div>
            <Button variant="ghost" onClick={onClose}>Hủy</Button>
            <Button
              icon="check"
              onClick={() => {
                if (!draft.title.trim()) return;
                onSave(initialItem.title, {
                  ...draft,
                  title: draft.title.trim(),
                  updatedAt: "Vừa cập nhật",
                });
              }}
            >
              Lưu cập nhật bài đăng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PublishedChaptersModal({
  initialItem,
  userRole,
  onClose,
  onSave,
  onBackToInfoEditor,
}: {
  initialItem: ContentItem;
  userRole: "USER" | "ADMIN";
  onClose: () => void;
  onSave: (oldTitle: string, updated: ContentItem) => void;
  onBackToInfoEditor?: (draft: ContentItem) => void;
}) {
  const [chapters, setChapters] = useState<PublishedChapterItem[]>(
    initialItem.chaptersList || defaultChaptersFor(initialItem.title, initialItem.type === "Phim")
  );
  const isOwner = initialItem.createdBy?.user === CURRENT_USER_HANDLE;
  const unitLabel = initialItem.type === "Truyện" ? "Chương" : "Tập";

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="admin-modal-wide" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>
              {isOwner
                ? "✍️ CẬP NHẬT CHƯƠNG / TẬP CHO BÀI TÔI ĐĂNG"
                : `🛡️ QUYỀN QUẢN TRỊ VIÊN (${userRole}) · CẬP NHẬT CHƯƠNG / TẬP`}
            </span>
            <h2>{initialItem.title} ({chapters.length} {unitLabel.toLowerCase()})</h2>
            <p>Thêm {unitLabel.toLowerCase()} mới, chỉnh sửa tiêu đề, đường dẫn đọc/xem và ghi chú cho từng {unitLabel.toLowerCase()}.</p>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
        </div>

        <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ fontSize: "11px" }}>Danh sách {unitLabel.toLowerCase()} hiện có ({chapters.length})</b>
          <Button
            variant="secondary"
            icon="plus"
            onClick={() => {
              const nextNum = String(chapters.length + 1);
              setChapters([
                ...chapters,
                {
                  id: Date.now(),
                  season: "Mùa 1",
                  number: nextNum,
                  title: `${unitLabel} ${nextNum}: Nội dung mới`,
                  url: initialItem.type === "Truyện" ? "https://mangadex.org" : "https://www.netflix.com",
                  note: "Vừa đăng",
                },
              ]);
            }}
          >
            + Thêm {unitLabel.toLowerCase()} mới
          </Button>
        </div>

        <div style={{ maxHeight: "340px", overflowY: "auto", paddingRight: "4px" }}>
          {chapters.map((ch, idx) => (
            <div className="admin-chap-row" key={ch.id}>
              <input
                value={ch.number}
                onChange={e => setChapters(chapters.map((x, i) => (i === idx ? { ...x, number: e.target.value } : x)))}
                placeholder="Số (1, 1.5)"
              />
              <input
                value={ch.title}
                onChange={e => setChapters(chapters.map((x, i) => (i === idx ? { ...x, title: e.target.value } : x)))}
                placeholder={`Tiêu đề ${unitLabel.toLowerCase()}`}
              />
              <input
                value={ch.url}
                onChange={e => setChapters(chapters.map((x, i) => (i === idx ? { ...x, url: e.target.value } : x)))}
                placeholder="https://..."
              />
              <input
                value={ch.note}
                onChange={e => setChapters(chapters.map((x, i) => (i === idx ? { ...x, note: e.target.value } : x)))}
                placeholder="Ghi chú..."
              />
              <Button
                variant="danger"
                onClick={() => setChapters(chapters.filter((_, i) => i !== idx))}
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          {onBackToInfoEditor ? (
            <Button
              variant="ghost"
              onClick={() => onBackToInfoEditor({ ...initialItem, chaptersList: chapters })}
            >
              ← Sửa thông tin chung
            </Button>
          ) : <div />}
          <div>
            <Button variant="ghost" onClick={onClose}>Hủy</Button>
            <Button
              icon="check"
              onClick={() =>
                onSave(initialItem.title, {
                  ...initialItem,
                  chaptersList: chapters,
                  updatedAt: "Vừa cập nhật chương/tập",
                })
              }
            >
              Lưu danh sách {unitLabel.toLowerCase()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LibraryPage({
  setPage,
  favorites,
  toggleFavorite,
  items = libraryItems,
  userRole = "USER",
  onUpdatePublishedContent,
  onRemoveFromLibrary,
  onRestoreToLibrary,
  onOpenPublicProfile,
  onOpenShareToChat,
  onSelectContent,
}: {
  setPage: (page: string) => void;
  favorites: string[];
  toggleFavorite: (title: string) => void;
  items?: ContentItem[];
  userRole?: "USER" | "ADMIN";
  onUpdatePublishedContent?: (oldTitle: string, updated: ContentItem) => void;
  onRemoveFromLibrary?: (title: string) => void;
  onRestoreToLibrary?: (item: ContentItem) => void;
  onOpenPublicProfile?: (username: string) => void;
  onOpenShareToChat?: (item: ContentItem) => void;
  onSelectContent?: (item: ContentItem) => void;
}) {
  const [tab, setTab] = useState("Tất cả");
  const [modal, setModal] = useState(false);
  const [view, setView] = useState("all");
  const [libSearch, setLibSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"Tất cả" | "Truyện" | "Phim">("Tất cả");
  const [sortBy, setSortBy] = useState<"newest" | "rating" | "az">("newest");
  const [libToast, setLibToast] = useState("");
  const [lastRemovedItem, setLastRemovedItem] = useState<ContentItem | null>(null);

  // State Chỉnh sửa & Cập nhật Truyện / Phim Tôi Đăng (cho chính User đăng nó hoặc Admin)
  const [editingPublishedItem, setEditingPublishedItem] = useState<ContentItem | null>(null);
  const [editingChaptersItem, setEditingChaptersItem] = useState<ContentItem | null>(null);

  // Quản lý danh mục riêng (Tạo mới, Chỉnh sửa, Xóa & Thêm truyện/phim vào danh mục)
  const [categories, setCategories] = useState([
    { name: "Kệ đêm mưa", icon: "☾", description: "Những câu chuyện dịu dàng cho ngày mưa." },
    { name: "Cyberpunk", icon: "◇", description: "Tương lai, neon và những ký ức bị đánh cắp." },
    { name: "Đọc cuối tuần", icon: "◫", description: "Danh sách để dành cho ngày nghỉ." },
    { name: "Phim chữa lành", icon: "✦", description: "Nhẹ nhàng, ấm áp và đầy hy vọng." },
    { name: "Trinh thám", icon: "⌕", description: "Bí ẩn cần được giải đáp." },
    { name: "Xem cùng bạn", icon: "♙", description: "Bộ sưu tập được lưu & chia sẻ với bạn bè." },
  ]);
  const [categoryModal, setCategoryModal] = useState<{ index: number | null; name: string; icon: string; description: string } | null>(null);
  const [assigningCategoryName, setAssigningCategoryName] = useState<string | null>(null);
  const [quickAssignItem, setQuickAssignItem] = useState<ContentItem | null>(null);
  const [confirmDeleteItem, setConfirmDeleteItem] = useState<ContentItem | null>(null);

  // Dữ liệu cá nhân độc lập cho từng bộ: Ghi chú, Điểm 1-5 sao, Trạng thái đọc/xem, Quyền riêng tư & Danh sách Danh mục riêng (hỗ trợ nhiều danh mục)
  const [personalMeta, setPersonalMeta] = useState<Record<string, {
    note: string;
    rating: number;
    readingStatus: string;
    categories: string[];
    privacy: "PRIVATE" | "SHARED" | "PEOPLE";
  }>>({
    "Nightfall City": { note: "Một thế giới lôi cuốn, càng đọc càng khó dứt ra...", rating: 5, readingStatus: "Đang đọc / xem", categories: ["Cyberpunk", "Trinh thám"], privacy: "SHARED" },
    "Thành Phố Mưa": { note: "Phần hình ảnh rất đẹp, nhịp kể chậm nhưng cuốn hút...", rating: 4, readingStatus: "Đang đọc / xem", categories: ["Kệ đêm mưa", "Phim chữa lành"], privacy: "PRIVATE" },
    "Lồng Đèn Đỏ": { note: "Lưu từ thư viện của @lananh — Bối cảnh cổ trang pha lẫn bí ẩn cực kỳ ấn tượng.", rating: 5, readingStatus: "Hoàn thành", categories: ["Trinh thám", "Xem cùng bạn"], privacy: "SHARED" },
    "Ký Ức Ngõ Hẻm": { note: "Lưu từ chia sẻ của @minhtran — Phim trinh thám tâm lý đáng xem cuối tuần.", rating: 4, readingStatus: "Đang đọc / xem", categories: ["Trinh thám", "Đọc cuối tuần"], privacy: "PRIVATE" },
    "Ngày Ta Gặp Lại": { note: "Lưu từ @hanguyen — Nhẹ nhàng, sâu lắng, đọc xong rất ấm lòng.", rating: 5, readingStatus: "Hoàn thành", categories: ["Kệ đêm mưa", "Đọc cuối tuần"], privacy: "SHARED" },
    "Ánh Sáng Cuối Hè": { note: "Tạm dừng ở phút 45 để hôm sau xem tiếp.", rating: 4, readingStatus: "Drop", categories: ["Phim chữa lành"], privacy: "PRIVATE" },
    "Võ Đài Linh Hồn": { note: "Các trận đấu mãn nhãn, nét vẽ cực kỳ có lực.", rating: 4, readingStatus: "Muốn đọc / xem", categories: ["Đọc cuối tuần"], privacy: "PRIVATE" },
    "Phía Sau Hoàng Hôn": { note: "Lưu từ @tuanminh — Ý tưởng sci-fi rất độc đáo.", rating: 5, readingStatus: "Đang đọc / xem", categories: ["Cyberpunk", "Xem cùng bạn"], privacy: "PEOPLE" },
    "Học Viện Ánh Trăng": { note: "Truyện phép thuật học đường giải trí nhẹ nhàng.", rating: 4, readingStatus: "Muốn đọc / xem", categories: ["Đọc cuối tuần"], privacy: "PRIVATE" },
    "Bản Giao Hưởng Cuối": { note: "Lưu từ @lananh — Nhạc phim thực sự đỉnh cao.", rating: 5, readingStatus: "Hoàn thành", categories: ["Phim chữa lành", "Xem cùng bạn"], privacy: "SHARED" },
    "Thành Phố Không Ngủ": { note: "Lưu từ thẻ chia sẻ trong nhóm Chat — Sẽ xem vào tối thứ 7.", rating: 5, readingStatus: "Muốn đọc / xem", categories: ["Cyberpunk", "Xem cùng bạn"], privacy: "SHARED" },
  });

  const getItemMeta = (item: ContentItem) => {
    return personalMeta[item.title] || {
      note: item.sharedFrom
        ? `Đã lưu từ chia sẻ của ${item.sharedFrom.name} (${item.sharedFrom.user}).`
        : "Một tác phẩm đáng chú ý trong bộ sưu tập cá nhân của tôi.",
      rating: 4,
      readingStatus: item.status === "Đang ra" ? "Đang đọc / xem" : item.status,
      categories: item.sharedFrom ? ["Xem cùng bạn"] : ["Đọc cuối tuần"],
      privacy: "PRIVATE" as const,
    };
  };

  const [editingEntry, setEditingEntry] = useState<{
    item: ContentItem;
    note: string;
    rating: number;
    readingStatus: string;
    categories: string[];
    privacy: "PRIVATE" | "SHARED" | "PEOPLE";
  } | null>(null);

  const openEditEntry = (item: ContentItem) => {
    const current = getItemMeta(item);
    setEditingEntry({ item, ...current });
  };

  const saveEditEntry = () => {
    if (!editingEntry) return;
    setPersonalMeta({
      ...personalMeta,
      [editingEntry.item.title]: {
        note: editingEntry.note,
        rating: editingEntry.rating,
        readingStatus: editingEntry.readingStatus,
        categories: editingEntry.categories,
        privacy: editingEntry.privacy,
      },
    });
    setLibToast(`Đã lưu cập nhật bản ghi cá nhân & danh mục cho “${editingEntry.item.title}”.`);
    setEditingEntry(null);
  };

  // Thêm / Gỡ một tác phẩm vào một danh mục riêng
  const toggleItemInCategory = (item: ContentItem, categoryName: string) => {
    const current = getItemMeta(item);
    const exists = current.categories.includes(categoryName);
    const nextCategories = exists
      ? current.categories.filter(c => c !== categoryName)
      : [...current.categories, categoryName];

    setPersonalMeta({
      ...personalMeta,
      [item.title]: {
        ...current,
        categories: nextCategories,
      },
    });
    setLibToast(
      exists
        ? `Đã gỡ “${item.title}” khỏi danh mục “${categoryName}”.`
        : `Đã thêm “${item.title}” vào danh mục “${categoryName}”.`
    );
  };

  // Xóa tác phẩm khỏi Thư viện cá nhân
  const handleDeleteFromLibrary = (item: ContentItem) => {
    setLastRemovedItem(item);
    onRemoveFromLibrary?.(item.title);
    setConfirmDeleteItem(null);
    setLibToast(`Đã xóa “${item.title}” khỏi Thư viện cá nhân của bạn.`);
  };

  const saveCategoryModal = () => {
    if (!categoryModal || !categoryModal.name.trim()) return;
    const trimmedName = categoryModal.name.trim();
    if (categoryModal.index === null) {
      setCategories([{ name: trimmedName, icon: categoryModal.icon || "✦", description: categoryModal.description.trim() || "Danh mục tự tạo của bạn." }, ...categories]);
      setLibToast(`Đã tạo danh mục riêng “${trimmedName}”. Hãy thêm truyện/phim vào danh mục này!`);
    } else {
      const oldName = categories[categoryModal.index]?.name;
      setCategories(categories.map((c, idx) => idx === categoryModal.index ? { ...c, name: trimmedName, icon: categoryModal.icon, description: categoryModal.description.trim() } : c));
      if (oldName && oldName !== trimmedName) {
        const updatedMeta = { ...personalMeta };
        Object.keys(updatedMeta).forEach(title => {
          updatedMeta[title] = {
            ...updatedMeta[title],
            categories: updatedMeta[title].categories.map(cat => cat === oldName ? trimmedName : cat),
          };
        });
        setPersonalMeta(updatedMeta);
        if (tab === oldName) setTab(trimmedName);
      }
      setLibToast(`Đã cập nhật danh mục “${trimmedName}”.`);
    }
    setCategoryModal(null);
  };

  const handleDeleteCategory = (catName: string, idx: number) => {
    setCategories(categories.filter((_, index) => index !== idx));
    const updatedMeta = { ...personalMeta };
    Object.keys(updatedMeta).forEach(title => {
      updatedMeta[title] = {
        ...updatedMeta[title],
        categories: updatedMeta[title].categories.filter(cat => cat !== catName),
      };
    });
    setPersonalMeta(updatedMeta);
    if (tab === catName) setTab("Tất cả");
    setLibToast(`Đã xóa danh mục “${catName}” (Các tác phẩm vẫn được giữ nguyên trong Thư viện).`);
  };

  // Đếm số lượng tác phẩm thực tế trong từng danh mục & trạng thái
  const getCategoryCount = (catName: string) =>
    items.filter(item => getItemMeta(item).categories.includes(catName)).length;

  const myPublishedItems = items.filter(item => item.createdBy?.user === CURRENT_USER_HANDLE);
  const sharedFromOthersItems = items.filter(item => Boolean(item.sharedFrom));
  const activeReadingItems = items.filter(item => {
    const st = getItemMeta(item).readingStatus;
    return st === "Đang đọc / xem" || st === "Đang ra";
  });

  const views = [
    { id: "all", value: String(items.length).padStart(2, "0"), label: "Tổng tác phẩm" },
    { id: "published", value: String(myPublishedItems.length).padStart(2, "0"), label: "Truyện/Phim tôi đăng ✍️" },
    { id: "favorites", value: String(items.filter(i => favorites.includes(i.title)).length).padStart(2, "0"), label: "Yêu thích ♥" },
    { id: "shared", value: String(sharedFromOthersItems.length).padStart(2, "0"), label: "Lưu từ chia sẻ 🌐" },
    { id: "categories", value: String(categories.length).padStart(2, "0"), label: "Danh mục riêng" },
  ];

  const isCustomCategoryTab = categories.some(c => c.name === tab);

  // Sàng lọc thực sự theo cả View, Tab (Trạng thái / Bài tôi đăng / Yêu thích / Lưu từ chia sẻ / Danh mục riêng), Loại và Từ khóa
  const filteredItems = items
    .filter(item => {
      const meta = getItemMeta(item);
      if (view === "published" && item.createdBy?.user !== CURRENT_USER_HANDLE) return false;
      if (view === "favorites" && !favorites.includes(item.title)) return false;
      if (view === "shared" && !item.sharedFrom) return false;
      if (view === "active" && meta.readingStatus !== "Đang đọc / xem" && meta.readingStatus !== "Đang ra") return false;

      if (tab === "Truyện tôi đăng") return item.createdBy?.user === CURRENT_USER_HANDLE;
      if (tab === "Yêu thích") return favorites.includes(item.title);
      if (tab === "Lưu từ chia sẻ") return Boolean(item.sharedFrom);
      if (tab === "Đang đọc / xem") return meta.readingStatus === "Đang đọc / xem" || meta.readingStatus === "Đang ra";
      if (tab === "Muốn đọc / xem") return meta.readingStatus === "Muốn đọc / xem";
      if (tab === "Đã hoàn thành") return meta.readingStatus === "Hoàn thành";
      if (tab === "Drop") return meta.readingStatus === "Drop";
      if (isCustomCategoryTab) return meta.categories.includes(tab);
      return true;
    })
    .filter(item => typeFilter === "Tất cả" || item.type === typeFilter)
    .filter(item => !libSearch || item.title.toLowerCase().includes(libSearch.toLowerCase()) || item.sub.toLowerCase().includes(libSearch.toLowerCase()));

  const shownItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "rating") return getItemMeta(b).rating - getItemMeta(a).rating;
    if (sortBy === "az") return a.title.localeCompare(b.title, "vi");
    return 0;
  });

  const systemTabs: { key: string; label: string; count: number; badge?: string }[] = [
    { key: "Tất cả", label: "Tất cả", count: items.length },
    { key: "Truyện tôi đăng", label: "Truyện / Phim tôi đăng", count: myPublishedItems.length, badge: "✍️" },
    { key: "Yêu thích", label: "Yêu thích", count: items.filter(i => favorites.includes(i.title)).length, badge: "♥" },
    { key: "Lưu từ chia sẻ", label: "Lưu từ chia sẻ", count: sharedFromOthersItems.length, badge: "🌐" },
    { key: "Đang đọc / xem", label: "Đang đọc / xem", count: activeReadingItems.length },
    { key: "Muốn đọc / xem", label: "Muốn đọc / xem", count: items.filter(i => getItemMeta(i).readingStatus === "Muốn đọc / xem").length },
    { key: "Đã hoàn thành", label: "Đã hoàn thành", count: items.filter(i => getItemMeta(i).readingStatus === "Hoàn thành").length },
  ];

  return <main className="inner-page">
    <div className="page-shell">
      <div className="library-head">
        <div>
          <span>KHÔNG GIAN CỦA BẠN</span>
          <h1>Thư Viện Cá Nhân</h1>
          <p>Quản lý truyện/phim của bạn, chỉnh sửa & cập nhật tác phẩm do bạn đăng tải, phân loại danh mục riêng và lưu giữ chia sẻ từ bạn bè.</p>
        </div>
        <div>
          <Button variant="secondary" icon="share" onClick={() => onOpenPublicProfile?.("@lananh")}>Khám phá thư viện bạn bè</Button>
          <Button variant="secondary" icon="plus" onClick={() => setCategoryModal({ index: null, name: "", icon: "☾", description: "" })}>Tạo danh mục riêng</Button>
          <Button variant="secondary" icon="plus" onClick={() => setPage("manga")}>Thêm từ kho chung</Button>
          <Button icon="plus" onClick={() => setPage("publish")}>Đăng truyện / phim</Button>
        </div>
      </div>

      {libToast && (
        <div className="success-banner" style={{ marginTop: "18px" }}>
          <Icon name="check" />
          <span>{libToast}</span>
          {lastRemovedItem && (
            <Button
              variant="secondary"
              onClick={() => {
                onRestoreToLibrary?.(lastRemovedItem);
                setLibToast(`Đã khôi phục “${lastRemovedItem.title}” trở lại Thư viện cá nhân!`);
                setLastRemovedItem(null);
              }}
            >
              Hoàn tác (Khôi phục)
            </Button>
          )}
          <button onClick={() => { setLibToast(""); setLastRemovedItem(null); }}>×</button>
        </div>
      )}

      {/* Hàng thẻ thống kê tương tác */}
      <div className="stats-row interactive-stats">
        {views.map(item => (
          <button
            className={view === item.id ? "active" : ""}
            onClick={() => {
              setView(item.id);
              if (item.id === "published") setTab("Truyện tôi đăng");
              else if (item.id === "favorites") setTab("Yêu thích");
              else if (item.id === "shared") setTab("Lưu từ chia sẻ");
              else if (item.id === "active") setTab("Đang đọc / xem");
              else if (item.id === "all") setTab("Tất cả");
            }}
            key={item.id}
          >
            <b>{item.value}</b>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Thanh Tab Sàng lọc theo Trạng thái, Bài tôi đăng, Lưu từ chia sẻ & Toàn bộ Danh mục riêng */}
      <div className="category-tabs">
        {systemTabs.map(t => (
          <button
            key={t.key}
            className={view !== "categories" && tab === t.key ? "active" : ""}
            onClick={() => { setView(t.key === "Truyện tôi đăng" ? "published" : "all"); setTab(t.key); }}
          >
            {t.badge && <span>{t.badge}</span>}
            {t.label}
            <span className="tab-count">{t.count}</span>
          </button>
        ))}
        {categories.map(cat => (
          <button
            key={cat.name}
            className={view !== "categories" && tab === cat.name ? "active" : ""}
            onClick={() => { setView("all"); setTab(cat.name); }}
          >
            <span>{cat.icon}</span>
            {cat.name}
            <small>RIÊNG</small>
            <span className="tab-count">{getCategoryCount(cat.name)}</span>
          </button>
        ))}
      </div>

      <section className="recent-history">
        <SectionTitle eyebrow="HOẠT ĐỘNG GẦN ĐÂY" title="Lịch sử đọc / xem gần đây" action="Xem toàn bộ" />
        <div className="history-track">
          {items.slice(0, 10).map((item, i) => (
            <button
              className="history-card"
              key={item.title}
              onClick={() => {
                onSelectContent?.(item);
                setPage("detail");
              }}
            >
              <img src={item.img} alt={item.title} />
              <div>
                <span>{item.type === "Truyện" ? "MANGA" : "MOVIE"} · {i < 2 ? "Vừa xong" : `${i + 1} giờ trước`}</span>
                <b>{item.title}</b>
                <p>{item.type === "Truyện" ? `Chương ${85 - i}` : `Tập ${Math.max(1, 10 - i)}`}</p>
                <div className="progress"><i style={{ width: `${88 - i * 6}%` }} /></div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="library-toolbar">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <p style={{ margin: 0 }}>
            <b>{view === "categories" ? "Quản lý Danh mục riêng" : `Đang lọc: ${tab}`}</b> ·{" "}
            {view === "categories" ? `${categories.length} danh mục` : `${shownItems.length} tác phẩm`}
          </p>
          {view !== "categories" && tab === "Truyện tôi đăng" && (
            <Button icon="plus" onClick={() => setPage("publish")}>
              + Đăng truyện / phim mới
            </Button>
          )}
          {view !== "categories" && isCustomCategoryTab && (
            <Button variant="secondary" icon="plus" onClick={() => setAssigningCategoryName(tab)}>
              Thêm truyện/phim vào “{tab}”
            </Button>
          )}
          {view !== "categories" && tab === "Lưu từ chia sẻ" && (
            <Button variant="secondary" icon="share" onClick={() => onOpenPublicProfile?.("@lananh")}>
              + Lưu thêm từ thư viện bạn bè
            </Button>
          )}
        </div>

        {view !== "categories" && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <div className="segment">
              {(["Tất cả", "Truyện", "Phim"] as const).map(tp => (
                <button key={tp} className={typeFilter === tp ? "active" : ""} onClick={() => setTypeFilter(tp)}>{tp}</button>
              ))}
            </div>
            <label>
              <Icon name="search" size={16} />
              <input value={libSearch} onChange={e => setLibSearch(e.target.value)} placeholder="Tìm tên, tác giả trong thư viện..." />
            </label>
            <button onClick={() => setSortBy(sortBy === "newest" ? "rating" : sortBy === "rating" ? "az" : "newest")}>
              Sắp xếp: {sortBy === "newest" ? "Mới nhất" : sortBy === "rating" ? "Điểm cá nhân ★" : "Tên A → Z"} <Icon name="chevron" size={15} />
            </button>
          </div>
        )}
      </div>

      {/* GIAO DIỆN QUẢN LÝ DANH MỤC RIÊNG */}
      {view === "categories" ? (
        <div className="category-grid">
          {categories.map((category, i) => {
            const count = getCategoryCount(category.name);
            return (
              <article className="category-card" key={category.name}>
                <div className="category-icon">{category.icon}</div>
                <div>
                  <span>DANH MỤC RIÊNG</span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <b>{count} tác phẩm trong danh mục</b>
                </div>
                <div className="category-actions">
                  <Button variant="secondary" onClick={() => { setTab(category.name); setView("all"); }}>
                    Xem ({count})
                  </Button>
                  <Button icon="plus" onClick={() => setAssigningCategoryName(category.name)}>
                    Thêm tác phẩm
                  </Button>
                  <button title="Chỉnh sửa danh mục" onClick={() => setCategoryModal({ index: i, name: category.name, icon: category.icon, description: category.description })}>
                    <Icon name="edit" size={15} />
                  </button>
                  <button title="Xóa danh mục" onClick={() => handleDeleteCategory(category.name, i)}>
                    <Icon name="x" size={15} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : shownItems.length === 0 ? (
        <div className="empty-results">
          <Icon name="book" size={28} />
          <b>Chưa có tác phẩm nào trong mục “{tab}”</b>
          <p>
            {isCustomCategoryTab
              ? `Bạn có thể nhấn nút bên dưới để chọn thêm truyện hoặc phim từ thư viện vào danh mục “${tab}”.`
              : "Hãy thử đổi bộ lọc hoặc đăng tải tác phẩm mới của bạn."}
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "10px" }}>
            {isCustomCategoryTab && (
              <Button icon="plus" onClick={() => setAssigningCategoryName(tab)}>
                + Thêm truyện/phim vào “{tab}”
              </Button>
            )}
            <Button variant="secondary" onClick={() => { setTab("Tất cả"); setView("all"); setTypeFilter("Tất cả"); setLibSearch(""); }}>
              Xem tất cả thư viện
            </Button>
          </div>
        </div>
      ) : (
        <div className="personal-grid">
          {shownItems.map((item, i) => {
            const meta = getItemMeta(item);
            const stars = "★".repeat(meta.rating) + "☆".repeat(5 - meta.rating);
            const isMyPublished = item.createdBy?.user === CURRENT_USER_HANDLE;
            const canEditPublished = canManagePublishedContent(item, userRole);
            const chCount = (item.chaptersList || defaultChaptersFor(item.title, item.type === "Phim")).length;

            return (
              <article className="personal-card" key={`${item.title}-${i}`}>
                <div className="personal-poster">
                  <img
                    src={item.img}
                    alt={item.title}
                    onClick={() => {
                      onSelectContent?.(item);
                      setPage("detail");
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <span className={`status ${meta.readingStatus === "Hoàn thành" ? "done" : meta.readingStatus === "Drop" ? "drop" : ""}`}>
                    {meta.readingStatus}
                  </span>
                  <FavoriteButton active={favorites.includes(item.title)} toggle={() => toggleFavorite(item.title)} />
                  <button className="more" title="Chỉnh sửa ghi chú, đánh giá & danh mục riêng" onClick={() => openEditEntry(item)}>
                    <Icon name="edit" size={14} />
                  </button>
                </div>

                <div className="personal-body">
                  <div className="title-row">
                    <div>
                      <h3
                        onClick={() => {
                          onSelectContent?.(item);
                          setPage("detail");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {item.title}
                      </h3>
                      <p>{item.type} · {item.sub}</p>
                    </div>
                    <div className="personal-rating" title={`Điểm cá nhân: ${meta.rating}/5 sao`}>{stars}</div>
                  </div>

                  {/* Danh sách các Danh mục riêng của tác phẩm + Nút gỡ nhanh khỏi danh mục + Nút thêm vào danh mục */}
                  <div className="lib-cat-chips">
                    {meta.categories.map(catName => (
                      <span key={catName} className="lib-cat-chip" onClick={() => { setTab(catName); setView("all"); }} style={{ cursor: "pointer" }}>
                        #{catName}
                        <button
                          type="button"
                          title={`Gỡ khỏi danh mục ${catName}`}
                          onClick={e => {
                            e.stopPropagation();
                            toggleItemInCategory(item, catName);
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button
                      type="button"
                      className="lib-cat-add"
                      title="Thêm hoặc gỡ khỏi các danh mục riêng"
                      onClick={() => setQuickAssignItem(item)}
                    >
                      + Danh mục
                    </button>
                  </div>

                  {/* Hộp Quản lý & Chỉnh sửa - Cập nhật Truyện / Phim Tôi Đăng (Chỉ hiện cho chính User đăng nó hoặc Admin) */}
                  {canEditPublished && (
                    <div className={`published-owner-box ${isMyPublished ? "owner" : "admin-override"}`}>
                      <div className="published-owner-head">
                        <span>
                          {isMyPublished
                            ? `✍️ Truyện/Phim tôi đăng (${CURRENT_USER_HANDLE})`
                            : `🛡️ Quyền Admin · Đăng bởi ${item.createdBy?.user || "@user"}`}
                        </span>
                        <small>{item.updatedAt || "Đã xuất bản"}</small>
                      </div>
                      <div className="published-owner-actions">
                        <button
                          type="button"
                          onClick={() => setEditingPublishedItem(item)}
                          title="Chỉnh sửa thông tin gốc, ảnh bìa, mô tả, thể loại của bài đăng"
                        >
                          ✏️ Sửa bài đăng
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingChaptersItem(item)}
                          title="Cập nhật thêm chương truyện hoặc tập phim mới"
                        >
                          📑 Chương/Tập ({chCount})
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Nhãn hiển thị nếu tác phẩm được lưu từ phần chia sẻ của người khác */}
                  {item.sharedFrom && (
                    <div
                      className="shared-source-box"
                      onClick={() => onOpenPublicProfile?.(item.sharedFrom!.user)}
                      title={`Xem thư viện công khai của ${item.sharedFrom.name}`}
                    >
                      <span>🌐 Lưu từ chia sẻ của <b>{item.sharedFrom.name} ({item.sharedFrom.user})</b></span>
                      <span>Xem hồ sơ ↗</span>
                    </div>
                  )}

                  <div className="note" onClick={() => openEditEntry(item)} style={{ cursor: "pointer" }} title="Nhấn để sửa ghi chú cá nhân">
                    <span>GHI CHÚ CỦA TÔI ✎</span>
                    <p>“{meta.note}”</p>
                  </div>

                  {/* Nếu đang xem trong 1 tab Danh mục riêng cụ thể, hiển thị nút gỡ nhanh khỏi danh mục đó */}
                  {isCustomCategoryTab && (
                    <button
                      type="button"
                      className="btn-remove-cat"
                      onClick={() => toggleItemInCategory(item, tab)}
                    >
                      <Icon name="x" size={12} /> Gỡ khỏi danh mục “{tab}”
                    </button>
                  )}

                  {view === "active" && (
                    <div className="active-progress">
                      <span>{item.type === "Truyện" ? `Chương ${85 - i}/100` : `Tập ${8 + i}/12`}</span>
                      <div className="progress"><i style={{ width: `${78 - i * 8}%` }} /></div>
                      <Button variant="secondary" icon="play" onClick={() => { onSelectContent?.(item); setPage("detail"); }}>
                        {item.type === "Truyện" ? "Đọc tiếp" : "Xem tiếp"}
                      </Button>
                    </div>
                  )}

                  <div className="card-bottom-actions">
                    <button
                      className={`privacy ${meta.privacy === "SHARED" ? "community" : meta.privacy === "PEOPLE" ? "people" : ""}`}
                      style={{ flex: 1, marginTop: 0 }}
                      onClick={() => setModal(true)}
                    >
                      {meta.privacy === "SHARED" ? "◎ Chia sẻ cộng đồng" : meta.privacy === "PEOPLE" ? "♙ Chia sẻ riêng" : "▣ Riêng tư"}
                      <Icon name="chevron" size={14} />
                    </button>
                    <button
                      className="icon-btn"
                      style={{ width: "30px", height: "30px" }}
                      title="Gửi chia sẻ qua Tin nhắn Chat"
                      onClick={() => onOpenShareToChat?.(item)}
                    >
                      <Icon name="send" size={14} />
                    </button>
                    <button
                      className="btn-remove-lib"
                      title="Xóa tác phẩm này khỏi Thư viện cá nhân"
                      onClick={() => setConfirmDeleteItem(item)}
                    >
                      <Icon name="x" size={14} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>

    {modal && <ShareModal close={() => setModal(false)} />}

    {/* MODAL CHỈNH SỬA THÔNG TIN GỐC TRUYỆN / PHIM TÔI ĐĂNG (HOẶC ADMIN) */}
    {editingPublishedItem && (
      <PublishedWorkEditorModal
        initialItem={editingPublishedItem}
        userRole={userRole}
        onClose={() => setEditingPublishedItem(null)}
        onSave={(oldTitle, updated) => {
          onUpdatePublishedContent?.(oldTitle, updated);
          setEditingPublishedItem(null);
          setLibToast(`Đã cập nhật thông tin bài đăng “${updated.title}” thành công!`);
        }}
        onOpenChaptersModal={draft => {
          setEditingPublishedItem(null);
          setEditingChaptersItem(draft);
        }}
      />
    )}

    {/* MODAL CẬP NHẬT CHƯƠNG / TẬP CHO TRUYỆN / PHIM TÔI ĐĂNG (HOẶC ADMIN) */}
    {editingChaptersItem && (
      <PublishedChaptersModal
        initialItem={editingChaptersItem}
        userRole={userRole}
        onClose={() => setEditingChaptersItem(null)}
        onSave={(oldTitle, updated) => {
          onUpdatePublishedContent?.(oldTitle, updated);
          setEditingChaptersItem(null);
          setLibToast(`Đã cập nhật danh sách chương/tập cho “${updated.title}”! `);
        }}
        onBackToInfoEditor={draft => {
          setEditingChaptersItem(null);
          setEditingPublishedItem(draft);
        }}
      />
    )}

    {/* MODAL 1: TẠO / SỬA DANH MỤC CÁ NHÂN */}
    {categoryModal && (
      <div className="modal-backdrop" onMouseDown={() => setCategoryModal(null)}>
        <div className="admin-modal-wide" style={{ width: "460px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>PHÂN LOẠI CÁ NHÂN</span>
              <h2>{categoryModal.index === null ? "Tạo Danh Mục Riêng" : "Chỉnh sửa Danh Mục"}</h2>
              <p>Tự tạo kệ sách/phim theo chủ đề yêu thích của riêng bạn.</p>
            </div>
            <button className="icon-btn" onClick={() => setCategoryModal(null)}><Icon name="x" /></button>
          </div>
          <label className="admin-field">
            <span>Tên danh mục *</span>
            <input value={categoryModal.name} onChange={e => setCategoryModal({ ...categoryModal, name: e.target.value })} placeholder="VD: Kệ truyện trinh thám cày đêm..." />
          </label>
          <div className="admin-field">
            <span>Chọn biểu tượng (Icon)</span>
            <div className="icon-picker">
              {["☾", "◇", "◫", "✦", "⌕", "♙", "♥", "⚡"].map(ic => (
                <button key={ic} type="button" className={categoryModal.icon === ic ? "active" : ""} onClick={() => setCategoryModal({ ...categoryModal, icon: ic })}>{ic}</button>
              ))}
            </div>
          </div>
          <label className="admin-field">
            <span>Mô tả ngắn</span>
            <textarea value={categoryModal.description} onChange={e => setCategoryModal({ ...categoryModal, description: e.target.value })} placeholder="Mô tả cho danh mục này..." />
          </label>
          <div className="modal-actions">
            <div />
            <div>
              <Button variant="ghost" onClick={() => setCategoryModal(null)}>Hủy</Button>
              <Button icon="check" onClick={saveCategoryModal}>Lưu danh mục</Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 2: THÊM / GỠ NHANH DANH MỤC CHO 1 TÁC PHẨM */}
    {quickAssignItem && (
      <div className="modal-backdrop" onMouseDown={() => setQuickAssignItem(null)}>
        <div className="admin-modal-wide" style={{ width: "480px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>PHÂN LOẠI VÀO KỆ RIÊNG</span>
              <h2>Gán Danh Mục: {quickAssignItem.title}</h2>
              <p>Chọn một hoặc nhiều danh mục riêng cho tác phẩm này.</p>
            </div>
            <button className="icon-btn" onClick={() => setQuickAssignItem(null)}><Icon name="x" /></button>
          </div>
          <div className="assign-list">
            {categories.map(cat => {
              const assigned = getItemMeta(quickAssignItem).categories.includes(cat.name);
              return (
                <div key={cat.name} className={`assign-row ${assigned ? "assigned" : ""}`}>
                  <div className="assign-row-left">
                    <div className="category-icon" style={{ width: "34px", height: "34px", fontSize: "15px" }}>{cat.icon}</div>
                    <div>
                      <b>{cat.name}</b>
                      <span>{cat.description}</span>
                    </div>
                  </div>
                  <Button
                    variant={assigned ? "secondary" : "primary"}
                    icon={assigned ? "check" : "plus"}
                    onClick={() => toggleItemInCategory(quickAssignItem, cat.name)}
                  >
                    {assigned ? "Đã có (Gỡ ra)" : "Thêm vào"}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="modal-actions">
            <Button variant="secondary" icon="plus" onClick={() => { setQuickAssignItem(null); setCategoryModal({ index: null, name: "", icon: "✦", description: "" }); }}>
              + Tạo danh mục mới
            </Button>
            <Button icon="check" onClick={() => setQuickAssignItem(null)}>Hoàn tất</Button>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 3: THÊM HÀNG LOẠT TRUYỆN / PHIM VÀO 1 DANH MỤC CỤ THỂ */}
    {assigningCategoryName && (
      <div className="modal-backdrop" onMouseDown={() => setAssigningCategoryName(null)}>
        <div className="admin-modal-wide" style={{ width: "540px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>QUẢN LÝ TÁC PHẨM TRONG DANH MỤC</span>
              <h2>Danh mục: “{assigningCategoryName}”</h2>
              <p>Chọn các bộ truyện/phim trong thư viện để thêm vào hoặc gỡ khỏi danh mục này.</p>
            </div>
            <button className="icon-btn" onClick={() => setAssigningCategoryName(null)}><Icon name="x" /></button>
          </div>
          <div className="assign-list">
            {items.map(item => {
              const inCat = getItemMeta(item).categories.includes(assigningCategoryName);
              return (
                <div key={item.title} className={`assign-row ${inCat ? "assigned" : ""}`}>
                  <div className="assign-row-left">
                    <img src={item.img} alt={item.title} />
                    <div>
                      <b>{item.title}</b>
                      <span>{item.type} · {item.sub} {item.sharedFrom ? `· 🌐 Từ ${item.sharedFrom.user}` : ""}</span>
                    </div>
                  </div>
                  <Button
                    variant={inCat ? "secondary" : "primary"}
                    icon={inCat ? "check" : "plus"}
                    onClick={() => toggleItemInCategory(item, assigningCategoryName)}
                  >
                    {inCat ? "Đã có (Gỡ khỏi mục)" : "Thêm vào danh mục"}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="modal-actions">
            <div />
            <Button icon="check" onClick={() => { setTab(assigningCategoryName); setView("all"); setAssigningCategoryName(null); }}>
              Xem danh mục “{assigningCategoryName}”
            </Button>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 4: XÁC NHẬN XÓA KHỎI THƯ VIỆN CÁ NHÂN */}
    {confirmDeleteItem && (
      <div className="modal-backdrop" onMouseDown={() => setConfirmDeleteItem(null)}>
        <div className="confirm-dialog" onMouseDown={e => e.stopPropagation()}>
          <div className="danger-symbol"><Icon name="flag" /></div>
          <h2>Xóa khỏi Thư viện?</h2>
          <p>
            Bạn có chắc muốn xóa <b>“{confirmDeleteItem.title}”</b> khỏi Thư viện cá nhân? Toàn bộ ghi chú riêng và phân loại danh mục của bộ này sẽ bị gỡ bỏ.
          </p>
          <div>
            <Button variant="ghost" onClick={() => setConfirmDeleteItem(null)}>Hủy</Button>
            <Button variant="danger" onClick={() => handleDeleteFromLibrary(confirmDeleteItem)}>Xóa khỏi thư viện</Button>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 5: SỬA GHI CHÚ CÁ NHÂN, ĐÁNH GIÁ SAO, TRẠNG THÁI & DANH MỤC TRONG THƯ VIỆN */}
    {editingEntry && (
      <div className="modal-backdrop" onMouseDown={() => setEditingEntry(null)}>
        <div className="admin-modal-wide" style={{ width: "520px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>DỮ LIỆU CÁ NHÂN ĐỘC LẬP</span>
              <h2>Tùy chỉnh Bản lưu Cá nhân</h2>
              <p>“{editingEntry.item.title}” — Thay đổi tại đây không ảnh hưởng tới dữ liệu gốc của người khác.</p>
            </div>
            <button className="icon-btn" onClick={() => setEditingEntry(null)}><Icon name="x" /></button>
          </div>
          <div className="admin-field-two">
            <label className="admin-field">
              <span>Trạng thái đọc / xem</span>
              <select value={editingEntry.readingStatus} onChange={e => setEditingEntry({ ...editingEntry, readingStatus: e.target.value })}>
                <option value="Muốn đọc / xem">Muốn đọc / xem (PLAN_TO_READ)</option>
                <option value="Đang đọc / xem">Đang đọc / xem (READING)</option>
                <option value="Hoàn thành">Đã hoàn thành (COMPLETED)</option>
                <option value="Drop">Đã tạm bỏ (DROPPED)</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Quyền hiển thị bản lưu này</span>
              <select value={editingEntry.privacy} onChange={e => setEditingEntry({ ...editingEntry, privacy: e.target.value as "PRIVATE" | "SHARED" | "PEOPLE" })}>
                <option value="PRIVATE">▣ Riêng tư (Chỉ mình tôi)</option>
                <option value="SHARED">◎ Chia sẻ cộng đồng (Công khai)</option>
                <option value="PEOPLE">♙ Chia sẻ riêng cho bạn bè</option>
              </select>
            </label>
          </div>

          <div className="admin-field">
            <span>Thuộc các Danh mục riêng ({editingEntry.categories.length} đã chọn)</span>
            <div className="admin-genre-picks" style={{ marginTop: "6px" }}>
              {categories.map(c => {
                const active = editingEntry.categories.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    className={active ? "active" : ""}
                    onClick={() => {
                      const next = active
                        ? editingEntry.categories.filter(x => x !== c.name)
                        : [...editingEntry.categories, c.name];
                      setEditingEntry({ ...editingEntry, categories: next });
                    }}
                  >
                    {c.icon} {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="admin-field">
            <span>Đánh giá cá nhân ({editingEntry.rating} / 5 sao)</span>
            <div className="star-picker">
              {[1, 2, 3, 4, 5].map(num => (
                <button key={num} type="button" className={editingEntry.rating >= num ? "active" : ""} onClick={() => setEditingEntry({ ...editingEntry, rating: num })}>
                  ★ {num}
                </button>
              ))}
            </div>
          </div>
          <label className="admin-field">
            <span>Ghi chú cá nhân của bạn</span>
            <textarea value={editingEntry.note} onChange={e => setEditingEntry({ ...editingEntry, note: e.target.value })} placeholder="Viết cảm nhận riêng, số tập đang dừng, hoặc lời nhắc cho bản thân..." />
          </label>
          <div className="modal-actions">
            <Button variant="danger" onClick={() => { const target = editingEntry.item; setEditingEntry(null); setConfirmDeleteItem(target); }}>
              Xóa khỏi thư viện
            </Button>
            <div>
              <Button variant="ghost" onClick={() => setEditingEntry(null)}>Hủy</Button>
              <Button icon="check" onClick={saveEditEntry}>Lưu vào thư viện</Button>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>;
}

function DetailPage({
  publishedTitle = "",
  savedItems = libraryItems,
  favorites = [],
  userRole = "USER",
  onUpdatePublishedContent,
  onDeletePublishedContent,
  onToggleLibrary,
  onToggleFavorite,
  onOpenShareToChat,
  onOpenReport,
  onOpenPublicProfile,
}: {
  publishedTitle?: string;
  savedItems?: ContentItem[];
  favorites?: string[];
  userRole?: "USER" | "ADMIN";
  onUpdatePublishedContent?: (oldTitle: string, updated: ContentItem) => void;
  onDeletePublishedContent?: (title: string) => void;
  onToggleLibrary?: (item: ContentItem) => void;
  onToggleFavorite?: (title: string) => void;
  onOpenShareToChat?: (item: ContentItem) => void;
  onOpenReport?: (targetType: "CONTENT" | "COMMENT", targetName: string) => void;
  onOpenPublicProfile?: (username: string) => void;
}) {
  const [season, setSeason] = useState("Mùa 1");
  const [reviewTab, setReviewTab] = useState("Bình luận chung");
  const [readChapters, setReadChapters] = useState<number[]>([0, 1]);
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);
  const [detailToast, setDetailToast] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [commentText, setCommentText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [editingWorkModal, setEditingWorkModal] = useState(false);
  const [editingChaptersModal, setEditingChaptersModal] = useState(false);

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Lan Anh",
      username: "@lananh",
      avatar: photos.rain,
      time: "2 giờ trước",
      rating: "5.0",
      text: "Phần xây dựng thế giới thật sự xuất sắc. Từng khung hình đều có cảm giác như đang chuyển động!",
      spoiler: "Rei thực ra đã biết thân phận của người đeo mặt nạ từ chương 8...",
    },
  ]);

  const matchedItem = [...savedItems, ...catalogItems].find(x => x.title === (publishedTitle || "Nightfall City"));
  const currentItem: ContentItem = matchedItem ?? {
    title: publishedTitle || "Nightfall City",
    sub: "Sora Kuroda · 2022",
    img: photos.red,
    status: "Đang ra",
    score: "4.8",
    type: "Truyện",
    genres: ["Cyberpunk", "Mystery", "Action", "Psychological"],
    createdBy: { name: CURRENT_USER_NAME, user: CURRENT_USER_HANDLE },
  };

  const inLibrary = savedItems.some(x => x.title === currentItem.title);
  const liked = favorites.includes(currentItem.title);
  const isOwner = currentItem.createdBy?.user === CURRENT_USER_HANDLE;
  const canEditWork = canManagePublishedContent(currentItem, userRole);
  const chapters = currentItem.chaptersList || defaultChaptersFor(currentItem.title, currentItem.type === "Phim");

  const toggleChapterRead = (idx: number) => setReadChapters(prev => prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]);

  const submitComment = () => {
    if (!commentText.trim()) return;
    setComments([
      {
        id: Date.now(),
        author: "Nguyễn Huy",
        username: "@huynguyen",
        avatar: photos.red,
        time: "Vừa xong",
        rating: `${userRating}.0`,
        text: isSpoiler ? "Bình luận này có chứa nội dung tiết lộ cốt truyện." : commentText.trim(),
        spoiler: isSpoiler ? commentText.trim() : "",
      },
      ...comments,
    ]);
    setCommentText("");
    setIsSpoiler(false);
    setDetailToast("Đã đăng đánh giá & bình luận của bạn!");
  };

  return <main className="detail-page">
    {detailToast && <div className="published-banner" style={{ cursor: "pointer" }} onClick={() => setDetailToast("")}><Icon name="check" /><span>{detailToast}</span></div>}

    {/* Thanh công cụ Quản lý Bài đăng dành riêng cho Tác giả đăng tải (@huynguyen) hoặc Quản trị viên (ADMIN) */}
    <div className="page-shell" style={{ paddingTop: "14px" }}>
      {canEditWork ? (
        <div className="author-manage-banner">
          <div>
            <span className="author-manage-badge">
              {isOwner ? "✍️ BÀI ĐĂNG CỦA TÔI" : "🛡️ QUYỀN QUẢN TRỊ VIÊN (ADMIN)"}
            </span>
            <b>
              {isOwner
                ? `Bạn (${CURRENT_USER_HANDLE}) là người đăng tải “${currentItem.title}” — Bạn có toàn quyền chỉnh sửa nội dung và cập nhật chương/tập.`
                : `Quản trị viên (ADMIN): Bạn có quyền chỉnh sửa & cập nhật bài đăng của ${currentItem.createdBy?.name || "Người dùng"} (${currentItem.createdBy?.user || "@user"}).`}
            </b>
          </div>
          <div className="author-manage-btns">
            <Button variant="secondary" icon="edit" onClick={() => setEditingWorkModal(true)}>
              Chỉnh sửa bài đăng
            </Button>
            <Button icon="plus" onClick={() => setEditingChaptersModal(true)}>
              Cập nhật Chương / Tập ({chapters.length})
            </Button>
            {onDeletePublishedContent && (
              <Button variant="danger" onClick={() => onDeletePublishedContent(currentItem.title)}>
                Xóa bài đăng
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="author-readonly-banner">
          <span>
            🌐 Tác phẩm được đăng tải bởi <b>{currentItem.createdBy?.name || "Thành viên cộng đồng"} ({currentItem.createdBy?.user || "@community"})</b> · Chỉ chính người đăng tải hoặc Quản trị viên (ADMIN) mới có quyền chỉnh sửa thông tin gốc & cập nhật chương/tập.
          </span>
        </div>
      )}
    </div>

    <section className="detail-hero"><img className="detail-backdrop" src={currentItem.img || photos.hero} alt="" /><div className="detail-overlay" /><div className="detail-content">
      <div className="detail-poster"><img src={currentItem.img} alt={currentItem.title} /><div className="match">98% PHÙ HỢP</div></div>
      <div className="detail-copy">
        <div className="detail-badges">
          <span>{currentItem.type === "Phim" ? "MOVIE" : "MANGA"}</span>
          <span className="ongoing">{currentItem.status.toUpperCase()}</span>
          {currentItem.visibility && <span>{currentItem.visibility}</span>}
        </div>
        <h1>{currentItem.title}</h1>
        <p className="jp">
          Đăng bởi {currentItem.createdBy?.name || CURRENT_USER_NAME} ({currentItem.createdBy?.user || CURRENT_USER_HANDLE}) · {currentItem.updatedAt || "Đã kiểm duyệt"}
        </p>
        <div className="creator"><span>THÔNG TIN <b>{currentItem.sub}</b></span><i /><span>PHÁT HÀNH <b>2022 — Nay</b></span><i /><Rating value={currentItem.score} /></div>
        <div className="genre-row">{currentItem.genres.map(g => <span key={g}>{g}</span>)}</div>
        <p className="description">
          {currentItem.description ||
            `Trong một thế giới nơi ký ức và cảm xúc đan xen giữa thực tại và chiều không gian số, nhân vật chính bước vào hành trình bóc tách sự thật ẩn giấu phía sau ${currentItem.title}.`}
        </p>
        <div className="external">
          <button onClick={() => window.open(currentItem.mainLink || "https://www.netflix.com", "_blank", "noopener,noreferrer")}>
            Nguồn chính thức <Icon name="arrow" size={15} />
          </button>
          <button onClick={() => window.open("https://mangadex.org", "_blank", "noopener,noreferrer")}>
            MangaDex <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="detail-actions">
          <Button
            icon={inLibrary ? "check" : "plus"}
            onClick={() => {
              onToggleLibrary?.(currentItem);
              setDetailToast(inLibrary ? `Đã xóa “${currentItem.title}” khỏi thư viện cá nhân.` : `Đã lưu “${currentItem.title}” vào thư viện cá nhân của bạn!`);
            }}
          >
            {inLibrary ? "Đã có trong thư viện" : "Thêm vào thư viện"}
          </Button>
          <Button
            variant="secondary"
            icon="heart"
            onClick={() => {
              onToggleFavorite?.(currentItem.title);
              setDetailToast(liked ? "Đã bỏ yêu thích." : "Đã thêm vào danh sách Yêu thích ❤️");
            }}
          >
            {liked ? "Đã yêu thích" : "Yêu thích"}
          </Button>
          {canEditWork && (
            <Button variant="secondary" icon="edit" onClick={() => setEditingWorkModal(true)}>
              Sửa bài đăng
            </Button>
          )}
          <Button variant="ghost" icon="share" onClick={() => onOpenShareToChat?.(currentItem)}>Chia sẻ qua Chat</Button>
          <Button variant="ghost" icon="flag" onClick={() => onOpenReport?.("CONTENT", currentItem.title)}>Báo cáo</Button>
        </div>
      </div>
    </div></section>
    <div className="page-shell detail-lower">
      <section className="chapters-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
          <SectionTitle eyebrow="DANH SÁCH NỘI DUNG" title={`Mùa & ${currentItem.type === "Truyện" ? "Chương" : "Tập"} (${chapters.length})`} />
          {canEditWork && (
            <Button variant="secondary" icon="plus" onClick={() => setEditingChaptersModal(true)}>
              + Cập nhật / Thêm {currentItem.type === "Truyện" ? "Chương" : "Tập"}
            </Button>
          )}
        </div>
        <div className="season-tabs">{["Mùa 1", "Mùa 2"].map(x => <button key={x} onClick={() => setSeason(x)} className={season === x ? "active" : ""}>{x}<small>{x === "Mùa 1" ? `${chapters.length} MỤC` : "SẮP RA MẮT"}</small></button>)}</div>
        <div className="chapter-list">
          {chapters.map((ch, i) => (
            <div className="chapter" key={ch.id}>
              <button className={`checkbox ${readChapters.includes(i) ? "checked" : ""}`} onClick={() => toggleChapterRead(i)}>
                {readChapters.includes(i) && <Icon name="check" size={14} />}
              </button>
              <div className="chap-num">
                {currentItem.type === "Truyện" ? "CHAP" : "TẬP"}<br /><b>{ch.number}</b>
              </div>
              <div className="chap-title">
                <b>{ch.title}</b>
                <span>{readChapters.includes(i) ? "Đã đọc/xem" : "Chưa đọc/xem"} · {ch.note || "Bản chuẩn"}</span>
              </div>
              <button className="comment-count" onClick={() => setReviewTab("Bình luận Chương/Tập")}>
                <Icon name="message" size={15} /> {12 + i * 4}
              </button>
              {canEditWork && (
                <button
                  type="button"
                  className="icon-btn"
                  title="Chỉnh sửa chương/tập này"
                  onClick={() => setEditingChaptersModal(true)}
                >
                  <Icon name="edit" size={14} />
                </button>
              )}
              <Button variant="secondary" icon="arrow" onClick={() => window.open(ch.url || "https://mangadex.org", "_blank", "noopener,noreferrer")}>
                Mở link
              </Button>
            </div>
          ))}
        </div>
      </section>

      {editingWorkModal && (
        <PublishedWorkEditorModal
          initialItem={currentItem}
          userRole={userRole}
          onClose={() => setEditingWorkModal(false)}
          onSave={(oldTitle, updated) => {
            onUpdatePublishedContent?.(oldTitle, updated);
            setEditingWorkModal(false);
            setDetailToast(`Đã lưu chỉnh sửa thông tin tác phẩm “${updated.title}”! `);
          }}
          onOpenChaptersModal={() => {
            setEditingWorkModal(false);
            setEditingChaptersModal(true);
          }}
        />
      )}

      {editingChaptersModal && (
        <PublishedChaptersModal
          initialItem={currentItem}
          userRole={userRole}
          onClose={() => setEditingChaptersModal(false)}
          onSave={(oldTitle, updated) => {
            onUpdatePublishedContent?.(oldTitle, updated);
            setEditingChaptersModal(false);
            setDetailToast(`Đã cập nhật danh sách chương/tập cho “${updated.title}”! `);
          }}
          onBackToInfoEditor={() => {
            setEditingChaptersModal(false);
            setEditingWorkModal(true);
          }}
        />
      )}
      <section className="reviews"><SectionTitle eyebrow="CỘNG ĐỒNG" title="Đánh giá & Bình luận" />
        <div className="review-tabs">{["Bình luận chung", "Bình luận Chương/Tập"].map(x => <button className={reviewTab === x ? "active" : ""} onClick={() => setReviewTab(x)} key={x}>{x}</button>)}</div>
        <div className="comment-form">
          <div className="comment-user">
            <img src={photos.red} alt="" />
            <div>
              <b>Đánh giá của bạn ({userRating}/5 sao)</b>
              <div className="star-picker" style={{ marginTop: "4px" }}>
                {[1, 2, 3, 4, 5].map(st => <button key={st} type="button" className={st <= userRating ? "on" : ""} onClick={() => setUserRating(st)}>★</button>)}
              </div>
            </div>
          </div>
          <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Chia sẻ cảm nhận của bạn về tác phẩm này..." />
          <div className="form-footer">
            <label><input type="checkbox" checked={isSpoiler} onChange={e => setIsSpoiler(e.target.checked)} /> <span>Cảnh báo Spoiler (Làm mờ nội dung)</span></label>
            <Button onClick={submitComment}>Đăng bình luận</Button>
          </div>
        </div>
        {comments.map(c => (
          <div className="thread" key={c.id} style={{ marginTop: "12px" }}>
            <img src={c.avatar} alt="" style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(c.username)} />
            <div>
              <div className="thread-meta">
                <b style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(c.username)}>{c.author}</b>
                <span>{c.time}</span>
                <Rating value={c.rating} />
              </div>
              <p>{c.text}</p>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button onClick={() => setCommentText(`@${c.author} `)}>Trả lời</button>
                <button style={{ color: "#f87171" }} onClick={() => onOpenReport?.("COMMENT", `Bình luận của ${c.author}`)}>Báo cáo vi phạm</button>
              </div>
              {c.spoiler && (
                <div className={`spoiler ${spoilerRevealed ? "revealed" : ""}`} onClick={() => setSpoilerRevealed(!spoilerRevealed)} style={{ cursor: "pointer" }}>
                  <div><Icon name="lock" /><b>Nội dung có spoiler</b><span>{spoilerRevealed ? "Nhấn để ẩn" : "Nhấn để hiển thị"}</span></div>
                  <p>{c.spoiler}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  </main>;
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-heading"><div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function AccountPage({ setPage }: { setPage: (page: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  return <main className="inner-page account-page"><div className="page-shell">
    <PageHeading eyebrow="HỒ SƠ NGƯỜI DÙNG" title="Thông tin tài khoản" description="Quản lý thông tin cá nhân và cách bạn xuất hiện trong cộng đồng." action={<Button variant="secondary" icon="users" onClick={() => setPage("friends")}>Quản lý bạn bè</Button>} />
    {saved && <div className="success-banner"><Icon name="check" /> Thông tin của bạn đã được cập nhật thành công.</div>}
    <div className="account-layout">
      <aside className="profile-card"><div className="profile-avatar"><img src={photos.red} alt="Nguyễn Huy" />{editing && <button><Icon name="edit" size={16} /></button>}</div><h2>Nguyễn Huy</h2><span>@huynguyen</span><p>Thành viên từ 18/08/2023</p><div><b>45</b><span>Tác phẩm</span><b>28</b><span>Bạn bè</span></div></aside>
      <section className="information-stack">
        <div className="information-card"><div className="card-head"><div><span>THÔNG TIN CÔNG KHAI</span><h3>Hồ sơ cá nhân</h3></div>{!editing && <Button variant="secondary" icon="edit" onClick={() => setEditing(true)}>Chỉnh sửa thông tin</Button>}</div>
          <div className="form-grid"><label><span>Tên hiển thị</span><input disabled={!editing} defaultValue="Nguyễn Huy" /></label><label><span>Tên người dùng</span><input disabled value="@huynguyen" readOnly /><small>Tên người dùng không thể thay đổi.</small></label><label className="wide"><span>Giới thiệu bản thân</span><textarea disabled={!editing} defaultValue="Mê manga trinh thám, những bộ phim cyberpunk và những câu chuyện khiến mình thức đến 3 giờ sáng." /></label></div>
        </div>
        <div className="information-card"><div className="card-head"><div><span>THÔNG TIN RIÊNG TƯ</span><h3>Tài khoản & bảo mật</h3></div></div><div className="form-grid"><label><span>Email</span><input disabled={!editing} defaultValue="huy.nguyen@example.com" /><small>Thay đổi email cần xác minh lại.</small></label><label><span>User ID</span><input disabled value="USR-2408-1893" readOnly /></label><div className="wide password-row"><div><span>Mật khẩu</span><p>Được thay đổi lần cuối 3 tháng trước</p></div><Button variant="ghost" icon="lock">Đổi mật khẩu</Button></div></div></div>
        {editing && <div className="edit-actions"><Button variant="ghost" onClick={() => setEditing(false)}>Hủy</Button><Button onClick={() => { setEditing(false); setSaved(true); }}>Lưu thay đổi</Button></div>}
      </section>
    </div>
  </div></main>;
}

function Toggle({ on, setOn }: { on: boolean; setOn: (value: boolean) => void }) {
  return <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)} aria-label={on ? "Tắt" : "Bật"}><i /></button>;
}

function SettingRow({ title, description, initial = true, control }: { title: string; description: string; initial?: boolean; control?: ReactNode }) {
  const [on, setOn] = useState(initial);
  return <div className="setting-row"><div><b>{title}</b><p>{description}</p></div>{control || <Toggle on={on} setOn={setOn} />}</div>;
}

function SettingsPage({ setPage }: { setPage: (page: string) => void }) {
  const [confirm, setConfirm] = useState("");
  return <main className="inner-page settings-page"><div className="page-shell narrow-shell">
    <PageHeading eyebrow="TÙY CHỈNH TRẢI NGHIỆM" title="Setting" description="Kiểm soát bảo mật, quyền riêng tư, thông báo và giao diện của bạn." />
    <div className="settings-layout"><aside className="settings-nav">{["Bảo mật tài khoản", "Quyền riêng tư", "Thông báo", "Giao diện", "Vùng nguy hiểm"].map((x, i) => <button className={i === 0 ? "active" : ""} key={x}>{x}</button>)}</aside>
      <div className="settings-content">
        <section className="settings-card"><div className="settings-card-title"><Icon name="lock" /><div><h3>Bảo mật tài khoản</h3><p>Bảo vệ tài khoản và quản lý phiên đăng nhập.</p></div></div><SettingRow title="Mật khẩu" description="Thay đổi mật khẩu đăng nhập của bạn." control={<Button variant="secondary">Thay đổi</Button>} /><SettingRow title="Xác thực đăng nhập" description="Nhận mã xác minh khi đăng nhập trên thiết bị mới." /><SettingRow title="Phiên đang hoạt động" description="3 thiết bị đang đăng nhập." control={<Button variant="ghost">Xem thiết bị</Button>} /><SettingRow title="Đăng xuất thiết bị khác" description="Giữ lại phiên đăng nhập hiện tại." control={<Button variant="danger">Đăng xuất tất cả</Button>} /></section>
        <section className="settings-card"><div className="settings-card-title"><Icon name="users" /><div><h3>Quyền riêng tư</h3><p>Chọn ai có thể kết nối và xem nội dung của bạn.</p></div></div><SettingRow title="Hiển thị thư viện" description="Cho phép bạn bè xem thư viện cá nhân." /><SettingRow title="Nội dung được chia sẻ" description="Cho phép cộng đồng xem ghi chú công khai." /><SettingRow title="Lời mời kết bạn" description="Cho phép mọi người gửi lời mời kết bạn." /><SettingRow title="Tin nhắn riêng" description="Chỉ nhận tin nhắn từ bạn bè." /><SettingRow title="Hiển thị hồ sơ" description="Hiển thị hồ sơ trong kết quả tìm kiếm." /></section>
        <section className="settings-card"><div className="settings-card-title"><Icon name="bell" /><div><h3>Thông báo</h3><p>Chọn những cập nhật bạn muốn nhận.</p></div></div><SettingRow title="Tin nhắn mới" description="Thông báo khi có tin nhắn trực tiếp hoặc nhóm." /><SettingRow title="Lời mời kết bạn" description="Thông báo về lời mời mới." /><SettingRow title="Chia sẻ nội dung" description="Thông báo khi ai đó chia sẻ tác phẩm." /><SettingRow title="Bình luận & trả lời" description="Thông báo tương tác với bình luận." /><SettingRow title="Thông báo hệ thống" description="Cập nhật bảo mật và tính năng quan trọng." /></section>
        <section className="settings-card"><div className="settings-card-title"><Icon name="settings" /><div><h3>Giao diện</h3><p>Tùy chỉnh cách nền tảng hiển thị.</p></div></div><SettingRow title="Chế độ tối" description="Tối ưu giao diện cho môi trường thiếu sáng." /><SettingRow title="Ngôn ngữ giao diện" description="Ngôn ngữ hiện tại: Tiếng Việt." control={<button className="select-control">Tiếng Việt <Icon name="chevron" size={14} /></button>} /><SettingRow title="Hiệu ứng chuyển động" description="Hiển thị glow và chuyển động khi tương tác." /></section>
        <section className="settings-card danger-card"><div className="settings-card-title"><Icon name="flag" /><div><h3>Vùng nguy hiểm</h3><p>Các hành động này có thể ảnh hưởng đến dữ liệu của bạn.</p></div></div><SettingRow title="Tạm khóa tài khoản" description="Ẩn hồ sơ và tạm dừng mọi hoạt động." control={<Button variant="danger" onClick={() => setConfirm("Tạm khóa")}>Tạm khóa</Button>} /><SettingRow title="Xóa tài khoản vĩnh viễn" description="Toàn bộ dữ liệu sẽ bị xóa và không thể khôi phục." control={<Button variant="danger" onClick={() => setConfirm("Xóa vĩnh viễn")}>Xóa tài khoản</Button>} /></section>
      </div>
    </div>
  </div>{confirm && <div className="modal-backdrop"><div className="confirm-dialog"><div className="danger-symbol"><Icon name="flag" /></div><h2>{confirm} tài khoản?</h2><p>Hành động này có ảnh hưởng lớn đến tài khoản và dữ liệu của bạn. Bạn có chắc muốn tiếp tục?</p><div><Button variant="ghost" onClick={() => setConfirm("")}>Hủy</Button><Button variant="danger" onClick={() => { setConfirm(""); setPage("login"); }}>Xác nhận</Button></div></div></div>}</main>;
}

function AuthPage({
  mode,
  setPage,
  onAuthenticated,
}: {
  mode: "login" | "register";
  setPage: (page: string) => void;
  onAuthenticated: (role: "USER" | "ADMIN") => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const detectRoleFromInput = (input: string): "USER" | "ADMIN" => {
    const normalized = input.trim().toLowerCase();
    return normalized.includes("admin") || normalized === "huy.nguyen@example.com" || normalized === "@huynguyen"
      ? "ADMIN"
      : "USER";
  };

  const submit = () => {
    setError(""); setSuccess("");
    if (!email || !password) return setError("Vui lòng điền đầy đủ các trường bắt buộc.");
    if (email.includes("@") && !email.startsWith("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Định dạng email không hợp lệ.");
    if (mode === "register" && password !== confirmPassword) return setError("Mật khẩu xác nhận không trùng khớp.");
    setLoading(true);
    const resolvedRole = mode === "login" ? detectRoleFromInput(email) : "USER";
    window.setTimeout(() => {
      setLoading(false);
      if (mode === "login" && email.toLowerCase().includes("wrong")) setError("Email hoặc mật khẩu không chính xác.");
      else {
        setSuccess(
          mode === "login"
            ? `Đăng nhập thành công (${resolvedRole === "ADMIN" ? "Quản trị viên - ADMIN" : "Người dùng - USER"}). Đang chuyển trang...`
            : "Đăng ký thành công! Bạn có thể đăng nhập ngay."
        );
        if (mode === "login") window.setTimeout(() => { onAuthenticated(resolvedRole); setPage("home"); }, 600);
      }
    }, 550);
  };
  return <main className="auth-page"><div className="auth-visual"><img src={photos.hero} alt="" /><div className="auth-overlay" /><div><Brand /><p>“Mỗi câu chuyện là một thế giới.<br />Hãy lưu giữ thế giới của riêng bạn.”</p><span>HƠN 12.000 TÁC PHẨM ĐANG CHỜ BẠN</span></div></div>
    <section className="auth-panel"><div className="auth-form"><span>{mode === "login" ? "CHÀO MỪNG TRỞ LẠI" : "TẠO TÀI KHOẢN"}</span><h1>{mode === "login" ? "Tiếp tục hành trình" : "Bắt đầu câu chuyện"}</h1><p>{mode === "login" ? "Đăng nhập để trở lại thư viện của bạn." : "Tham gia cộng đồng yêu truyện và điện ảnh."}</p>
      {error && <div className="form-error">! {error}</div>}
      {success && <div className="form-success"><Icon name="check" size={15} /> {success}</div>}
      {mode === "register" && <><label className="auth-field"><span>Tên hiển thị</span><input placeholder="Nguyễn Huy" /></label><label className="auth-field"><span>Tên người dùng</span><input placeholder="@username" /></label></>}
      <label className="auth-field"><span>Email {mode === "login" && "hoặc tên người dùng"}</span><input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder={mode === "login" ? "VD: user@library.local hoặc admin@library.local" : "you@example.com"} /></label>
      <label className="auth-field"><span>Mật khẩu</span><div><input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Tối thiểu 8 ký tự" /><button onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Ẩn" : "Hiện"}</button></div></label>
      {mode === "register" && <label className="auth-field"><span>Xác nhận mật khẩu</span><input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" /></label>}
      <div className="auth-options"><label><input type="checkbox" /> {mode === "login" ? "Ghi nhớ đăng nhập" : "Tôi đồng ý với Điều khoản & Chính sách"}</label>{mode === "login" && <button>Quên mật khẩu?</button>}</div>
      <Button className="auth-submit" onClick={success ? () => { if (mode === "login") onAuthenticated(detectRoleFromInput(email)); setPage(mode === "login" ? "home" : "login"); } : submit}>{loading ? "Đang xử lý..." : success ? mode === "login" ? "Vào trang chủ" : "Đến đăng nhập" : mode === "login" ? "Đăng nhập" : "Đăng ký"}</Button>
      {mode === "login" && (
        <div style={{ marginTop: "14px", padding: "12px", borderRadius: "10px", background: "#140f1e", border: "1px solid #2f2540" }}>
          <div style={{ fontSize: "9px", color: "#9c8fb0", marginBottom: "8px", fontWeight: 600, textAlign: "center" }}>
            ĐĂNG NHẬP NHANH THEO PHÂN QUYỀN (DEMO ROLE):
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            <Button
              variant="secondary"
              icon="users"
              onClick={() => { onAuthenticated("USER"); setPage("home"); }}
            >
              Người dùng (USER)
            </Button>
            <Button
              variant="secondary"
              icon="settings"
              onClick={() => { onAuthenticated("ADMIN"); setPage("admin"); }}
            >
              Quản trị (ADMIN)
            </Button>
          </div>
        </div>
      )}
      <div className="auth-switch">{mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}<button onClick={() => setPage(mode === "login" ? "register" : "login")}>{mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}</button></div>
    </div></section>
  </main>;
}

function PublishPage({ setPage, onPublish }: { setPage: (page: string) => void; onPublish: (item: ContentItem) => void }) {
  const [type, setType] = useState<"Truyện" | "Phim">("Truyện");
  const [genres, setGenres] = useState<string[]>(["Mystery"]);
  const [links, setLinks] = useState([{ platform: "MangaDex", url: "", note: "Đọc bản dịch chính thức" }]);
  const [chapters, setChapters] = useState([{ number: "1", title: "Thành phố không ngủ", url: "" }]);
  const [movieMode, setMovieMode] = useState("Phim lẻ");
  const [privacy, setPrivacy] = useState("Cộng đồng");
  const [selectedUsers, setSelectedUsers] = useState(["@lananh"]);
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState("");
  const available = type === "Truyện" ? mangaGenres : movieGenres;
  const addLink = () => setLinks([...links, { platform: "Nền tảng khác", url: "", note: "" }]);
  const addChapter = () => setChapters([...chapters, { number: String(chapters.length + 1), title: "", url: "" }]);
  const upload = (file?: File) => { if (!file) return; const reader = new FileReader(); reader.onload = () => setCover(String(reader.result)); reader.readAsDataURL(file); };
  const attempt = (action: string) => {
    if (!title.trim()) { setError("Vui lòng nhập tên truyện / phim trước khi tiếp tục."); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setError(""); setDialog(action);
  };
  return <main className="inner-page publish-page"><div className="page-shell publish-shell">
    <PageHeading eyebrow="NỘI DUNG CỦA BẠN" title="Đăng truyện / phim mới" description="Chia sẻ những câu chuyện và bộ phim yêu thích của bạn với cộng đồng." action={<Button variant="ghost" onClick={() => setPage("library")}>Quay lại thư viện</Button>} />
    {error && <div className="form-error publish-alert">! {error}</div>}{notice && <div className="success-banner"><Icon name="check" />{notice}</div>}
    <div className="publish-layout"><aside className="publish-steps">{["Thông tin cơ bản", "Thể loại & phân loại", "Đường dẫn đọc / xem", type === "Truyện" ? "Quản lý chương" : "Phần & tập phim", "Thông tin thêm", "Cài đặt đăng tải"].map((x, i) => <button className={i === 0 ? "active" : ""} key={x}><span>{i + 1}</span>{x}</button>)}</aside>
      <div className="publish-form">
        <section className="publish-section"><div className="publish-title"><span>01</span><div><h2>Thông tin cơ bản</h2><p>Những thông tin đầu tiên giúp cộng đồng nhận biết tác phẩm.</p></div></div>
          <div className="type-switch"><button className={type === "Truyện" ? "active" : ""} onClick={() => { setType("Truyện"); setGenres([]); }}>Truyện <small>Manga / Story</small></button><button className={type === "Phim" ? "active" : ""} onClick={() => { setType("Phim"); setGenres([]); }}>Phim <small>Movie / Series</small></button></div>
          <div className="cover-form"><label className="cover-upload">{cover ? <img src={cover} alt="Xem trước ảnh bìa" /> : <><Icon name="plus" size={25} /><b>Kéo thả ảnh bìa tại đây</b><span>PNG, JPG · Tỷ lệ đề xuất 2:3</span></>}<input type="file" accept="image/*" onChange={e => upload(e.target.files?.[0])} /></label>
            <div className="publish-fields"><label><span>Tên truyện / phim *</span><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ví dụ: Thành phố trong mưa" /></label><label><span>Mô tả ngắn</span><textarea placeholder="Một câu giới thiệu ngắn gọn và thu hút..." /></label>{type === "Truyện" ? <div className="two-fields"><label><span>Tác giả *</span><input placeholder="Tên tác giả" /></label><label><span>Họa sĩ</span><input placeholder="Tên họa sĩ (nếu có)" /></label></div> : <><div className="two-fields"><label><span>Đạo diễn *</span><input placeholder="Tên đạo diễn" /></label><label><span>Năm phát hành</span><input placeholder="2025" /></label></div><label><span>Diễn viên</span><input placeholder="Phân cách tên bằng dấu phẩy" /></label></>}</div>
          </div><label className="full-field"><span>Mô tả chi tiết</span><textarea className="rich-area" placeholder="Viết nội dung giới thiệu, tóm tắt hoặc cảm nhận chi tiết..." /></label>
        </section>
        <section className="publish-section"><div className="publish-title"><span>02</span><div><h2>Thể loại & phân loại</h2><p>Chọn nhiều thể loại phù hợp để người đọc dễ tìm thấy.</p></div></div><div className="publish-genres">{available.map(g => <button className={genres.includes(g) ? "active" : ""} onClick={() => setGenres(genres.includes(g) ? genres.filter(x => x !== g) : [...genres, g])} key={g}>{g}</button>)}</div><div className="three-fields"><label><span>Trạng thái</span><select><option>Đang ra</option><option>Hoàn thành</option><option>Drop</option></select></label><label><span>Ngôn ngữ</span><select><option>Tiếng Việt</option><option>Tiếng Anh</option><option>Tiếng Nhật</option></select></label><label><span>Năm xuất bản</span><input placeholder="2025" /></label></div></section>
        <section className="publish-section"><div className="publish-title"><span>03</span><div><h2>Đường dẫn đọc / xem</h2><p>Thêm liên kết hợp pháp đến nền tảng bên ngoài.</p></div></div>{links.map((link, i) => <div className="dynamic-row" key={i}><span className="drag">⠿</span><input value={link.platform} onChange={e => setLinks(links.map((x, index) => index === i ? { ...x, platform: e.target.value } : x))} placeholder="Nền tảng" /><input value={link.url} onChange={e => setLinks(links.map((x, index) => index === i ? { ...x, url: e.target.value } : x))} placeholder="https://..." /><input value={link.note} onChange={e => setLinks(links.map((x, index) => index === i ? { ...x, note: e.target.value } : x))} placeholder="Mô tả liên kết" /><button onClick={() => setLinks(links.filter((_, index) => index !== i))}><Icon name="x" size={15} /></button></div>)}<Button variant="secondary" icon="plus" onClick={addLink}>Thêm đường dẫn</Button></section>
        <section className="publish-section"><div className="publish-title"><span>04</span><div><h2>{type === "Truyện" ? "Quản lý chương" : "Phần & tập phim"}</h2><p>Mỗi chương hoặc tập phim có thể sử dụng một đường dẫn riêng.</p></div></div>
          {type === "Phim" && <div className="type-switch mini"><button className={movieMode === "Phim lẻ" ? "active" : ""} onClick={() => setMovieMode("Phim lẻ")}>Phim lẻ</button><button className={movieMode === "Series" ? "active" : ""} onClick={() => setMovieMode("Series")}>TV / Anime Series</button></div>}
          {type === "Phim" && movieMode === "Phim lẻ" ? <label className="full-field"><span>Đường dẫn xem phim</span><input placeholder="https://netflix.com/..." /></label> : <>{type === "Phim" && <div className="season-heading"><b>Mùa 1 · Khởi đầu</b><Button variant="ghost" icon="plus">Thêm mùa</Button></div>}{chapters.map((chapter, i) => <div className="chapter-editor" key={i}><span className="drag">⠿</span><div><small>{type === "Truyện" ? "CHƯƠNG" : "TẬP"}</small><input value={chapter.number} onChange={e => setChapters(chapters.map((x, index) => index === i ? { ...x, number: e.target.value } : x))} /></div><label><span>Tiêu đề</span><input value={chapter.title} onChange={e => setChapters(chapters.map((x, index) => index === i ? { ...x, title: e.target.value } : x))} placeholder="Tên chương / tập" /></label><label><span>Đường dẫn</span><input value={chapter.url} onChange={e => setChapters(chapters.map((x, index) => index === i ? { ...x, url: e.target.value } : x))} placeholder="https://..." /></label><button><Icon name="edit" size={15} /></button><button onClick={() => setChapters(chapters.filter((_, index) => index !== i))}><Icon name="x" size={15} /></button></div>)}<Button variant="secondary" icon="plus" onClick={addChapter}>{type === "Truyện" ? "Thêm chương" : "Thêm tập"}</Button></>}
        </section>
        <section className="publish-section"><div className="publish-title"><span>05</span><div><h2>Thông tin thêm</h2><p>Các dữ liệu tùy chọn dành riêng cho bộ sưu tập của bạn.</p></div></div><div className="two-fields"><label><span>Nguồn / tham khảo</span><input placeholder="Tên nguồn hoặc URL tham khảo" /></label><label><span>Thẻ bổ sung</span><input placeholder="neon, tương lai, bí ẩn..." /></label></div><label className="full-field"><span>Ghi chú cá nhân</span><textarea placeholder="Ghi chú riêng về nội dung này..." /></label><div className="rating-notice"><Rating value="—" /><p>Điểm cộng đồng được tính tự động từ đánh giá của người dùng và không thể chỉnh sửa thủ công.</p></div></section>
        <section className="publish-section"><div className="publish-title"><span>06</span><div><h2>Cài đặt đăng tải</h2><p>Kiểm soát những người có thể khám phá nội dung của bạn.</p></div></div><div className="privacy-options">{[["Riêng tư", "Chỉ bạn có thể truy cập"], ["Cộng đồng", "Mọi người có thể khám phá"], ["Chia sẻ riêng", "Chỉ những người được chọn"]].map(x => <button className={privacy === x[0] ? "active" : ""} onClick={() => setPrivacy(x[0])} key={x[0]}><Icon name={x[0] === "Riêng tư" ? "lock" : x[0] === "Cộng đồng" ? "users" : "share"} /><b>{x[0]}</b><span>{x[1]}</span></button>)}</div>
          {privacy === "Chia sẻ riêng" && <div className="private-users"><label><Icon name="search" size={16} /><input placeholder="Tìm người dùng để chia sẻ..." /></label><div>{selectedUsers.map(user => <span key={user}>{user}<button onClick={() => setSelectedUsers(selectedUsers.filter(x => x !== user))}>×</button></span>)}<button onClick={() => !selectedUsers.includes("@minhtran") && setSelectedUsers([...selectedUsers, "@minhtran"])}>+ @minhtran</button></div></div>}
          <label className="comment-permission"><input type="checkbox" defaultChecked /> Cho phép người khác bình luận và đánh giá nội dung.</label><div className="copyright-note"><Icon name="flag" /><p>Việc đăng tải chỉ chia sẻ metadata và các đường dẫn bên ngoài. Không tải lên hoặc phân phối tệp truyện, phim có bản quyền.</p></div>
        </section>
        <div className="publish-actions"><Button variant="ghost" onClick={() => setPage("library")}>Hủy</Button><div><Button variant="secondary" onClick={() => { setNotice("Đã lưu bản nháp lúc 21:42."); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Lưu bản nháp</Button><Button variant="secondary" onClick={() => attempt("preview")}>Xem trước</Button><Button icon="arrow" onClick={() => attempt("publish")}>Đăng truyện / phim</Button></div></div>
      </div>
    </div>
  </div>{dialog && <div className="modal-backdrop"><div className="confirm-dialog publish-confirm"><div className="danger-symbol safe"><Icon name={dialog === "preview" ? "search" : "check"} /></div><h2>{dialog === "preview" ? "Xem trước nội dung?" : "Sẵn sàng đăng tải?"}</h2><p>{dialog === "preview" ? `Bản xem trước “${title}” sẽ hiển thị theo dữ liệu bạn đã nhập.` : `“${title}” sẽ được đăng với quyền: ${privacy}. Bạn có thể chỉnh sửa sau.`}</p><div><Button variant="ghost" onClick={() => setDialog("")}>Quay lại</Button><Button onClick={() => dialog === "publish" ? onPublish({
    title,
    sub: `${type} · ${CURRENT_USER_NAME} · ${genres.length ? genres.join(", ") : "Drama"}`,
    img: cover || photos.hero,
    status: "Đang ra",
    score: "—",
    type,
    genres: genres.length ? genres : ["Drama"],
    createdBy: { name: CURRENT_USER_NAME, user: CURRENT_USER_HANDLE },
    description: `Tác phẩm ${type.toLowerCase()} “${title}” do ${CURRENT_USER_NAME} (${CURRENT_USER_HANDLE}) đăng tải và quản lý trực tiếp trên nền tảng.`,
    mainLink: links[0]?.url?.trim() || (type === "Phim" ? "https://netflix.com/" : "https://mangadex.org/"),
    visibility: privacy === "Riêng tư" ? "PRIVATE" : privacy === "Chia sẻ riêng" ? "SHARED" : "PUBLIC",
    updatedAt: "Vừa đăng",
    chaptersList: chapters.map((ch, idx) => ({
      id: idx + 1,
      season: "Mùa 1",
      number: String(ch.number || idx + 1),
      title: ch.title.trim() || `${type === "Phim" ? "Tập" : "Chương"} ${idx + 1}`,
      url: ch.url.trim() || (type === "Phim" ? "https://netflix.com/" : "https://mangadex.org/"),
      note: "Bản chính thức",
    })),
  }) : setDialog("")}>{dialog === "publish" ? "Xác nhận đăng" : "Mở xem trước"}</Button></div></div></div>}</main>;
}

const friendData = [
  { name: "Lan Anh", user: "@lananh", bio: "Mê anime chữa lành và phim Nhật.", img: photos.rain, online: true },
  { name: "Minh Trần", user: "@minhtran", bio: "Đọc shounen, xem sci-fi mỗi tối.", img: photos.city, online: true },
  { name: "Thu Hà", user: "@hanguyen", bio: "Một chiếc mọt truyện chính hiệu.", img: photos.lantern, online: false },
  { name: "Tuấn Minh", user: "@tuanminh", bio: "Review phim và manga trinh thám.", img: photos.street, online: false },
];

function FriendsPage({ setPage, onOpenPublicProfile }: { setPage: (page: string) => void; onOpenPublicProfile?: (username: string) => void }) {
  const [tab, setTab] = useState("Danh sách bạn bè");
  const [requestTab, setRequestTab] = useState("Đã nhận");
  const [requests, setRequests] = useState(["Lan Anh", "Thu Hà"]);
  const [sent, setSent] = useState<string[]>(["Minh Trần"]);
  const [friends, setFriends] = useState(["Tuấn Minh"]);
  const [confirm, setConfirm] = useState<{ name: string; action: string } | null>(null);
  const [menu, setMenu] = useState("");
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [toast, setToast] = useState("");
  const accept = (name: string) => { setRequests(requests.filter(x => x !== name)); if (!friends.includes(name)) setFriends([...friends, name]); setToast(`Đã chấp nhận lời mời kết bạn từ ${name}.`); };
  const relationship = (name: string) => friends.includes(name) ? "friend" : requests.includes(name) ? "incoming" : sent.includes(name) ? "sent" : "none";
  const visible = friendData.filter(f => (!query || `${f.name} ${f.user}`.toLowerCase().includes(query.toLowerCase())) && (!onlineOnly || f.online));
  return <main className="inner-page friends-page"><div className="page-shell">
    <PageHeading eyebrow="KẾT NỐI CỘNG ĐỒNG" title="Bạn bè" description="Tìm người cùng sở thích, chia sẻ câu chuyện và trò chuyện cùng nhau." action={<Button variant="secondary" icon="users">Mời bạn bè</Button>} />
    {toast && <div className="success-banner"><Icon name="check" />{toast}<button onClick={() => setToast("")}>×</button></div>}
    <div className="friend-stats"><div><b>{28 + friends.length}</b><span>Tổng bạn bè</span></div><div><b>{requests.length}</b><span>Lời mời đang chờ</span></div><div><b>{sent.length}</b><span>Lời mời đã gửi</span></div></div>
    <div className="friend-tabs">{["Danh sách bạn bè", "Lời mời kết bạn", "Tìm kiếm bạn bè"].map(x => <button className={tab === x ? "active" : ""} onClick={() => setTab(x)} key={x}>{x}{x === "Lời mời kết bạn" && requests.length > 0 && <span>{requests.length}</span>}</button>)}</div>
    {tab === "Tìm kiếm bạn bè" && <div className="find-toolbar"><label className="friend-search"><Icon name="search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm kiếm theo tên hoặc username..." /><Button>Tìm kiếm</Button></label><label className="online-filter"><input type="checkbox" checked={onlineOnly} onChange={e => setOnlineOnly(e.target.checked)} /> Chỉ hiển thị đang online</label></div>}
    {tab === "Lời mời kết bạn" && <div className="request-tabs"><button className={requestTab === "Đã nhận" ? "active" : ""} onClick={() => setRequestTab("Đã nhận")}>Lời mời đã nhận · {requests.length}</button><button className={requestTab === "Đã gửi" ? "active" : ""} onClick={() => setRequestTab("Đã gửi")}>Lời mời đã gửi · {sent.length}</button></div>}
    <div className="section-kicker">{tab === "Tìm kiếm bạn bè" ? "GỢI Ý DÀNH CHO BẠN" : tab === "Danh sách bạn bè" ? "TẤT CẢ BẠN BÈ" : requestTab === "Đã nhận" ? "LỜI MỜI ĐANG CHỜ PHẢN HỒI" : "LỜI MỜI ĐANG CHỜ CHẤP NHẬN"}</div>
    <div className="friend-grid">{visible.filter(f => tab === "Danh sách bạn bè" ? friends.includes(f.name) : tab === "Lời mời kết bạn" ? (requestTab === "Đã nhận" ? requests.includes(f.name) : sent.includes(f.name)) : true).map(f => <article className="friend-card" key={f.name}><div className="friend-avatar" style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(f.user)}><img src={f.img} alt={f.name} /><i className={f.online ? "online" : ""} /></div><div className="friend-info"><h3 style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(f.user)}>{f.name}</h3><span>{f.user}</span><p>{f.bio}</p><small>{f.online ? "Đang hoạt động" : "Offline"} · {2 + f.name.length % 5} bạn chung</small></div>
      {tab === "Lời mời kết bạn" && requestTab === "Đã nhận" ? <div className="friend-actions"><span className="request-date">Gửi 2 ngày trước</span><Button onClick={() => accept(f.name)}>Chấp nhận</Button><Button variant="ghost" onClick={() => setRequests(requests.filter(x => x !== f.name))}>Từ chối</Button></div> : tab === "Lời mời kết bạn" ? <div className="friend-actions"><span className="pending-badge">ĐANG CHỜ · 18/05/2025</span><Button variant="ghost" onClick={() => setSent(sent.filter(x => x !== f.name))}>Hủy lời mời</Button></div> : tab === "Tìm kiếm bạn bè" ? <div className="friend-actions">{relationship(f.name) === "friend" ? <Button variant="secondary" icon="check">Bạn bè</Button> : relationship(f.name) === "incoming" ? <Button onClick={() => accept(f.name)}>Chấp nhận</Button> : relationship(f.name) === "sent" ? <Button variant="ghost" onClick={() => setSent(sent.filter(x => x !== f.name))}>Đã gửi lời mời · Hủy</Button> : <Button icon="plus" onClick={() => setSent([...sent, f.name])}>Kết bạn</Button>}<Button variant="ghost" onClick={() => onOpenPublicProfile?.(f.user)}>Xem hồ sơ</Button></div> : <div className="friend-actions"><Button icon="message" onClick={() => setPage("chat")}>Nhắn tin</Button><Button variant="ghost" onClick={() => onOpenPublicProfile?.(f.user)}>Xem hồ sơ</Button><div className="friend-menu-wrap"><button className="friend-more" onClick={() => setMenu(menu === f.name ? "" : f.name)}><Icon name="more" /></button>{menu === f.name && <div className="friend-option-menu"><button onClick={() => onOpenPublicProfile?.(f.user)}>Xem hồ sơ & Thư viện</button><button onClick={() => setConfirm({ name: f.name, action: "remove" })}>Hủy kết bạn</button><button className="danger" onClick={() => setConfirm({ name: f.name, action: "block" })}>Chặn người dùng</button></div>}</div></div>}
    </article>)}</div>
    {!visible.length && <div className="empty-results"><Icon name="users" size={28} /><b>Không tìm thấy người dùng</b><p>Hãy thử một tên hoặc username khác.</p></div>}
  </div>{confirm && <div className="modal-backdrop"><div className="confirm-dialog"><div className="danger-symbol"><Icon name="flag" /></div><h2>{confirm.action === "block" ? `Chặn ${confirm.name}?` : `Hủy kết bạn với ${confirm.name}?`}</h2><p>{confirm.action === "block" ? "Người này sẽ không thể tìm thấy, gửi lời mời hoặc nhắn tin cho bạn." : "Hai bạn sẽ không còn thấy nội dung chỉ chia sẻ với bạn bè."}</p><div><Button variant="ghost" onClick={() => setConfirm(null)}>Hủy</Button><Button variant="danger" onClick={() => { setFriends(friends.filter(x => x !== confirm.name)); setToast(confirm.action === "block" ? `Đã chặn ${confirm.name}.` : `Đã hủy kết bạn với ${confirm.name}.`); setConfirm(null); }}>Xác nhận</Button></div></div></div>}</main>;
}

type GroupMemberRole = "LEADER" | "ADMIN" | "MEMBER";

type GroupMember = {
  name: string;
  user: string;
  avatar: string;
  role: GroupMemberRole;
  nickname?: string;
  online: boolean;
};

type PendingGroupMember = {
  name: string;
  user: string;
  avatar: string;
  invitedBy: string;
  requestedAt: string;
};

type ChatAttachment = {
  id: string;
  kind: "IMAGE" | "VIDEO" | "FILE";
  name: string;
  url: string;
  sizeLabel: string;
};

type ChatMessageItem = {
  id: string;
  senderName: string;
  senderUser: string;
  senderAvatar: string;
  isMe: boolean;
  time: string;
  text?: string;
  revoked?: boolean;
  systemEvent?: boolean;
  status?: "Đã gửi" | "Đã nhận" | "Đã xem";
  attachments?: ChatAttachment[];
  sharedContent?: {
    title: string;
    typeLabel: string;
    score: string;
    desc: string;
    img: string;
  };
};

type ConversationState = {
  id: string;
  name: string;
  text: string;
  img: string;
  count: number;
  group: boolean;
  requireApproval: boolean;
  members: GroupMember[];
  pendingMembers: PendingGroupMember[];
  sharedMedia: Array<{ id: string; kind: "IMAGE" | "VIDEO"; url: string; title: string }>;
  messages: ChatMessageItem[];
};

const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

const initialConversationStates: ConversationState[] = [
  {
    id: "conv-manga-club",
    name: "Hội mê manga",
    text: "Lan Anh: Phim này cũng có vibe khá giống đó...",
    img: photos.city,
    count: 2,
    group: true,
    requireApproval: true,
    members: [
      { name: "Huy Nguyễn", user: "@huynguyen", avatar: photos.red, role: "LEADER", nickname: "Admin Huy", online: true },
      { name: "Lan Anh", user: "@lananh", avatar: photos.rain, role: "ADMIN", nickname: "Thánh soi chap mới", online: true },
      { name: "Minh Trần", user: "@minhtran", avatar: photos.city, role: "MEMBER", nickname: "Minh Cyberpunk", online: true },
      { name: "Thu Hà", user: "@hanguyen", avatar: photos.lantern, role: "MEMBER", nickname: "", online: false },
      { name: "Tuấn Minh", user: "@tuanminh", avatar: photos.street, role: "MEMBER", nickname: "Nhà phê bình", online: true },
    ],
    pendingMembers: [
      { name: "Hoàng Nam", user: "@hoangnam", avatar: photos.alley, invitedBy: "Minh Trần", requestedAt: "5 phút trước" },
      { name: "Khánh Linh", user: "@khanhlinh", avatar: photos.red, invitedBy: "Lan Anh", requestedAt: "18 phút trước" },
    ],
    sharedMedia: [
      { id: "m1", kind: "IMAGE", url: photos.red, title: "Nightfall City Poster" },
      { id: "m2", kind: "IMAGE", url: photos.rain, title: "Thành Phố Mưa Concept" },
      { id: "m3", kind: "IMAGE", url: photos.lantern, title: "Lồng Đèn Đỏ Artwork" },
    ],
    messages: [
      {
        id: "msg-1",
        senderName: "Lan Anh",
        senderUser: "@lananh",
        senderAvatar: photos.rain,
        isMe: false,
        time: "20:14",
        text: "Mọi người đã đọc chap 10.5 của Nightfall City chưa?",
      },
      {
        id: "msg-2",
        senderName: "Huy Nguyễn",
        senderUser: "@huynguyen",
        senderAvatar: photos.red,
        isMe: true,
        time: "20:16",
        text: "Vừa đọc xong luôn. Cái kết bất ngờ thật!",
        status: "Đã xem",
      },
      {
        id: "msg-3",
        senderName: "Minh Trần",
        senderUser: "@minhtran",
        senderAvatar: photos.city,
        isMe: false,
        time: "20:18",
        revoked: true,
      },
      {
        id: "msg-4",
        senderName: "Lan Anh",
        senderUser: "@lananh",
        senderAvatar: photos.rain,
        isMe: false,
        time: "20:20",
        text: "Phim này cũng có vibe khá giống đó, để mình chia sẻ nhé.",
        sharedContent: {
          title: "Thành Phố Không Ngủ",
          typeLabel: "PHIM · 2024",
          score: "4.7",
          desc: "Một kiến trúc sư truy tìm những mảnh ký ức bị thất lạc giữa đô thị tương lai.",
          img: photos.lantern,
        },
      },
    ],
  },
  {
    id: "conv-lan-anh",
    name: "Lan Anh",
    text: "Cậu xem phim này chưa?",
    img: photos.rain,
    count: 1,
    group: false,
    requireApproval: false,
    members: [
      { name: "Huy Nguyễn", user: "@huynguyen", avatar: photos.red, role: "LEADER", nickname: "Huy", online: true },
      { name: "Lan Anh", user: "@lananh", avatar: photos.rain, role: "MEMBER", nickname: "Lan Anh 🌸", online: true },
    ],
    pendingMembers: [],
    sharedMedia: [{ id: "m-la-1", kind: "IMAGE", url: photos.rain, title: "Poster Anime" }],
    messages: [
      {
        id: "la-1",
        senderName: "Lan Anh",
        senderUser: "@lananh",
        senderAvatar: photos.rain,
        isMe: false,
        time: "20:21",
        text: "Cậu xem bộ Thành Phố Mưa bản Director's Cut chưa? Nhạc phim đỉnh lắm luôn!",
      },
    ],
  },
  {
    id: "conv-movie-night",
    name: "Movie Night",
    text: "Hẹn mọi người tối thứ 7",
    img: photos.lantern,
    count: 0,
    group: true,
    requireApproval: true,
    members: [
      { name: "Huy Nguyễn", user: "@huynguyen", avatar: photos.red, role: "LEADER", nickname: "Chủ rạp", online: true },
      { name: "Tuấn Minh", user: "@tuanminh", avatar: photos.street, role: "ADMIN", nickname: "Chọn phim", online: true },
      { name: "Lan Anh", user: "@lananh", avatar: photos.rain, role: "MEMBER", nickname: "", online: true },
    ],
    pendingMembers: [],
    sharedMedia: [{ id: "m-mn-1", kind: "IMAGE", url: photos.lantern, title: "Lịch chiếu tối thứ 7" }],
    messages: [
      {
        id: "mn-1",
        senderName: "Tuấn Minh",
        senderUser: "@tuanminh",
        senderAvatar: photos.street,
        isMe: false,
        time: "19:45",
        text: "Hẹn mọi người tối thứ 7 lúc 21h bật Video Call xem chung nhé!",
      },
    ],
  },
  {
    id: "conv-tuan-minh",
    name: "Tuấn Minh",
    text: "Đã gửi tệp kịch bản phân tích",
    img: photos.street,
    count: 0,
    group: false,
    requireApproval: false,
    members: [
      { name: "Huy Nguyễn", user: "@huynguyen", avatar: photos.red, role: "LEADER", online: true },
      { name: "Tuấn Minh", user: "@tuanminh", avatar: photos.street, role: "MEMBER", online: false },
    ],
    pendingMembers: [],
    sharedMedia: [],
    messages: [
      {
        id: "tm-1",
        senderName: "Tuấn Minh",
        senderUser: "@tuanminh",
        senderAvatar: photos.street,
        isMe: false,
        time: "18:30",
        text: "Mình gửi cậu bản PDF tổng hợp timeline của Nightfall City nhé.",
        attachments: [
          {
            id: "att-init-1",
            kind: "FILE",
            name: "Nightfall_City_Timeline_Analysis.pdf",
            url: "#",
            sizeLabel: "2.4 MB · PDF",
          },
        ],
      },
    ],
  },
  {
    id: "conv-midnight-shelf",
    name: "Kệ sách nửa đêm",
    text: "Hà: Mình vừa thêm truyện...",
    img: photos.alley,
    count: 0,
    group: true,
    requireApproval: false,
    members: [
      { name: "Huy Nguyễn", user: "@huynguyen", avatar: photos.red, role: "LEADER", online: true },
      { name: "Thu Hà", user: "@hanguyen", avatar: photos.lantern, role: "ADMIN", nickname: "Mọt sách đêm", online: false },
      { name: "Minh Trần", user: "@minhtran", avatar: photos.city, role: "MEMBER", online: true },
    ],
    pendingMembers: [],
    sharedMedia: [{ id: "m-ms-1", kind: "IMAGE", url: photos.alley, title: "Ký Ức Ngõ Hẻm" }],
    messages: [
      {
        id: "ms-1",
        senderName: "Thu Hà",
        senderUser: "@hanguyen",
        senderAvatar: photos.lantern,
        isMe: false,
        time: "20:24",
        text: "Mình vừa thêm bộ Tiệm Cầm Đồ Thời Gian vào kệ chung của nhóm rồi đó!",
      },
    ],
  },
];

function ChatPage({
  setPage,
  onOpenShareToChat,
  onOpenPublicProfile,
  onSaveSharedToLibrary,
}: {
  setPage: (page: string) => void;
  onOpenShareToChat?: (item?: ContentItem) => void;
  onOpenPublicProfile?: (username: string) => void;
  onSaveSharedToLibrary?: (item: ContentItem) => void;
}) {
  const [convList, setConvList] = useState<ConversationState[]>(initialConversationStates);
  const [active, setActive] = useState(0);
  const [convQuery, setConvQuery] = useState("");
  const [inChatSearch, setInChatSearch] = useState("");
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [message, setMessage] = useState("");
  const [stagedAttachments, setStagedAttachments] = useState<ChatAttachment[]>([]);
  const [showSampleMediaPicker, setShowSampleMediaPicker] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Modal Quản lý bạn bè, lời mời kết bạn đã nhận / đã gửi và tìm kiếm ngay trong trang Nhắn tin
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [friendModalTab, setFriendModalTab] = useState<"friends" | "received" | "sent" | "search">("friends");
  const [friendSearchQuery, setFriendSearchQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [friends, setFriends] = useState<string[]>(["Tuấn Minh", "Lan Anh"]);
  const [receivedRequests, setReceivedRequests] = useState<string[]>(["Thu Hà"]);
  const [sentRequests, setSentRequests] = useState<string[]>(["Minh Trần"]);
  const [chatToast, setChatToast] = useState("");

  // Modal Tạo nhóm chat mới
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMembers, setNewGroupMembers] = useState<string[]>(["Lan Anh", "Tuấn Minh"]);

  // Các Modal quản lý nhóm nâng cao (Đổi tên nhóm, Đổi Avatar nhóm, Thêm thành viên, Phê duyệt, Đặt biệt danh & Phân quyền, Video Call)
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameInput, setRenameInput] = useState("");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [addMemberQuery, setAddMemberQuery] = useState("");
  const [selectedToAdd, setSelectedToAdd] = useState<string[]>([]);
  const [addAsPendingMode, setAddAsPendingMode] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [editingMemberTarget, setEditingMemberTarget] = useState<GroupMember | null>(null);
  const [nicknameInput, setNicknameInput] = useState("");
  const [roleInput, setRoleInput] = useState<GroupMemberRole>("MEMBER");

  // State cho Chat Video Nhóm / 1-1 Thời gian thực
  const [activeCall, setActiveCall] = useState<{
    mode: "VIDEO" | "AUDIO";
    isGroup: boolean;
    title: string;
    seconds: number;
    micOn: boolean;
    camOn: boolean;
    screenShare: boolean;
    participants: GroupMember[];
  } | null>(null);

  const currentConv = convList[active] || convList[0];

  const notifyChat = (msg: string) => {
    setChatToast(msg);
    window.setTimeout(() => setChatToast(""), 3500);
  };

  // ĐỒNG BỘ THỜI GIAN THỰC (BroadcastChannel giữa các tab + Live Timer cho Video Call)
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel("personal_library_chat_realtime_v2");
      channel.onmessage = event => {
        if (event.data?.type === "SYNC_CONVERSATIONS" && Array.isArray(event.data.payload)) {
          setConvList(event.data.payload);
        }
      };
    } catch {
      // Fallback nếu môi trường không hỗ trợ BroadcastChannel
    }
    return () => {
      channel?.close();
    };
  }, []);

  useEffect(() => {
    if (!activeCall) return;
    const timer = window.setInterval(() => {
      setActiveCall(prev => (prev ? { ...prev, seconds: prev.seconds + 1 } : null));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeCall !== null]);

  const broadcastAndSetConvList = (updater: (prev: ConversationState[]) => ConversationState[]) => {
    setConvList(prev => {
      const next = updater(prev);
      try {
        const channel = new BroadcastChannel("personal_library_chat_realtime_v2");
        channel.postMessage({ type: "SYNC_CONVERSATIONS", payload: next });
        channel.close();
      } catch {
        // Ignore broadcast error
      }
      return next;
    });
  };

  const nowTimeStr = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  const updateCurrentConv = (updater: (conv: ConversationState) => ConversationState) => {
    const targetId = currentConv.id;
    broadcastAndSetConvList(prev => prev.map(c => (c.id === targetId ? updater(c) : c)));
  };

  const appendSystemEvent = (convId: string, eventText: string) => {
    const sysMsg: ChatMessageItem = {
      id: `sys-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      senderName: "Hệ thống",
      senderUser: "@system",
      senderAvatar: photos.red,
      isMe: false,
      time: nowTimeStr(),
      text: eventText,
      systemEvent: true,
    };
    broadcastAndSetConvList(prev =>
      prev.map(c =>
        c.id === convId
          ? {
              ...c,
              text: eventText,
              messages: [...c.messages, sysMsg],
            }
          : c
      )
    );
  };

  // Xử lý chọn tệp / hình ảnh / video từ máy tính
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      const isImg = file.type.startsWith("image/");
      const isVid = file.type.startsWith("video/");
      const sizeKB = Math.max(1, Math.round(file.size / 1024));
      const sizeLabel = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

      if (isImg) {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = String(reader.result);
          setStagedAttachments(prev => [
            ...prev,
            {
              id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              kind: "IMAGE",
              name: file.name,
              url: dataUrl,
              sizeLabel: `${sizeLabel} · ẢNH`,
            },
          ]);
        };
        reader.readAsDataURL(file);
      } else if (isVid) {
        const objectUrl = URL.createObjectURL(file);
        setStagedAttachments(prev => [
          ...prev,
          {
            id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            kind: "VIDEO",
            name: file.name,
            url: objectUrl,
            sizeLabel: `${sizeLabel} · VIDEO`,
          },
        ]);
      } else {
        const ext = file.name.split(".").pop()?.toUpperCase() || "FILE";
        setStagedAttachments(prev => [
          ...prev,
          {
            id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            kind: "FILE",
            name: file.name,
            url: "#",
            sizeLabel: `${sizeLabel} · ${ext}`,
          },
        ]);
      }
    });
  };

  // Gửi tin nhắn + tệp/hình ảnh/video đồng bộ thời gian thực
  const send = () => {
    if (!message.trim() && stagedAttachments.length === 0) return;
    const textVal = message.trim();
    const attachmentsToSend = [...stagedAttachments];
    const msgId = `msg-${Date.now()}`;
    const targetConvId = currentConv.id;

    const newMsg: ChatMessageItem = {
      id: msgId,
      senderName: "Huy Nguyễn",
      senderUser: "@huynguyen",
      senderAvatar: photos.red,
      isMe: true,
      time: nowTimeStr(),
      text: textVal || undefined,
      status: "Đã gửi",
      attachments: attachmentsToSend.length > 0 ? attachmentsToSend : undefined,
    };

    const summaryText =
      textVal ||
      (attachmentsToSend[0]?.kind === "IMAGE"
        ? "🖼️ Bạn: Đã gửi hình ảnh"
        : attachmentsToSend[0]?.kind === "VIDEO"
        ? "🎬 Bạn: Đã gửi video"
        : `📎 Bạn: Đã gửi tệp ${attachmentsToSend[0]?.name}`);

    const newMediaItems = attachmentsToSend
      .filter(a => a.kind === "IMAGE" || a.kind === "VIDEO")
      .map(a => ({
        id: a.id,
        kind: a.kind as "IMAGE" | "VIDEO",
        url: a.url,
        title: a.name,
      }));

    broadcastAndSetConvList(prev =>
      prev.map(c =>
        c.id === targetConvId
          ? {
              ...c,
              text: summaryText,
              sharedMedia: [...newMediaItems, ...c.sharedMedia],
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );

    setMessage("");
    setStagedAttachments([]);
    setShowSampleMediaPicker(false);

    // Đồng bộ trạng thái "Đã nhận" -> "Đã xem" & phản hồi thời gian thực
    window.setTimeout(() => {
      broadcastAndSetConvList(prev =>
        prev.map(c =>
          c.id === targetConvId
            ? {
                ...c,
                messages: c.messages.map(m => (m.id === msgId ? { ...m, status: "Đã xem" } : m)),
              }
            : c
        )
      );
    }, 900);

    // Mô phỏng thành viên trong nhóm đang nhập và trả lời thời gian thực
    const responder = currentConv.members.find(m => m.user !== "@huynguyen") || {
      name: "Lan Anh",
      user: "@lananh",
      avatar: photos.rain,
      role: "MEMBER" as GroupMemberRole,
      online: true,
    };

    window.setTimeout(() => {
      setTypingUser(responder.nickname || responder.name);
    }, 1100);

    window.setTimeout(() => {
      setTypingUser(null);
      const replyText =
        attachmentsToSend.some(a => a.kind === "VIDEO")
          ? "Video nét căng luôn! Cảnh hành động đoạn này đỉnh thật sự 🔥"
          : attachmentsToSend.some(a => a.kind === "IMAGE")
          ? "Ảnh poster đẹp xuất sắc, mình lưu về bộ sưu tập liền đây ✨"
          : attachmentsToSend.some(a => a.kind === "FILE")
          ? `Cảm ơn cậu nhé, mình vừa tải tệp “${attachmentsToSend[0].name}” về máy rồi!`
          : `Đồng ý luôn! Mình cũng đang theo dõi sát bộ này cùng mọi người trong ${currentConv.name}.`;

      const replyMsg: ChatMessageItem = {
        id: `reply-${Date.now()}`,
        senderName: responder.name,
        senderUser: responder.user,
        senderAvatar: responder.avatar,
        isMe: false,
        time: nowTimeStr(),
        text: replyText,
      };

      broadcastAndSetConvList(prev =>
        prev.map(c =>
          c.id === targetConvId
            ? {
                ...c,
                text: `${responder.nickname || responder.name}: ${replyText}`,
                messages: [...c.messages, replyMsg],
              }
            : c
        )
      );
    }, 2600);
  };

  // Thu hồi tin nhắn theo thời gian thực
  const revokeMessage = (msgId: string) => {
    updateCurrentConv(c => ({
      ...c,
      text: "Bạn đã thu hồi một tin nhắn",
      messages: c.messages.map(m => (m.id === msgId ? { ...m, revoked: true, text: undefined, attachments: undefined } : m)),
    }));
    notifyChat("Đã thu hồi tin nhắn theo thời gian thực.");
  };

  // Đổi tên nhóm thời gian thực
  const handleConfirmRenameGroup = () => {
    if (!renameInput.trim()) return;
    const newName = renameInput.trim();
    const convId = currentConv.id;
    updateCurrentConv(c => ({ ...c, name: newName }));
    appendSystemEvent(convId, `✏️ Huy Nguyễn đã đổi tên nhóm thành “${newName}”.`);
    setShowRenameModal(false);
    notifyChat(`Đã đổi tên nhóm thành “${newName}” (đồng bộ thời gian thực).`);
  };

  // Đổi ảnh đại diện nhóm thời gian thực
  const handleConfirmChangeAvatar = (newImgUrl: string) => {
    if (!newImgUrl) return;
    const convId = currentConv.id;
    updateCurrentConv(c => ({
      ...c,
      img: newImgUrl,
      sharedMedia: [{ id: `av-${Date.now()}`, kind: "IMAGE", url: newImgUrl, title: "Ảnh đại diện nhóm mới" }, ...c.sharedMedia],
    }));
    appendSystemEvent(convId, "🖼️ Huy Nguyễn đã cập nhật ảnh đại diện nhóm mới.");
    setShowAvatarModal(false);
    setCustomAvatarUrl("");
    notifyChat("Đã cập nhật ảnh đại diện nhóm theo thời gian thực!");
  };

  // Đặt biệt danh & Phân quyền thành viên nhóm thời gian thực
  const handleSaveMemberSettings = () => {
    if (!editingMemberTarget) return;
    const targetUser = editingMemberTarget.user;
    const trimmedNick = nicknameInput.trim();
    const nextRole = roleInput;
    const convId = currentConv.id;

    updateCurrentConv(c => ({
      ...c,
      members: c.members.map(m => {
        if (m.user === targetUser) {
          return { ...m, nickname: trimmedNick, role: nextRole };
        }
        // Nếu chuyển quyền Trưởng nhóm (LEADER) cho người khác thì hạ Trưởng nhóm cũ xuống ADMIN
        if (nextRole === "LEADER" && m.role === "LEADER" && m.user !== targetUser) {
          return { ...m, role: "ADMIN" };
        }
        return m;
      }),
    }));

    const roleLabel = nextRole === "LEADER" ? "Trưởng nhóm 👑" : nextRole === "ADMIN" ? "Phó nhóm 🛡️" : "Thành viên";
    appendSystemEvent(
      convId,
      `🏷️ Đã cập nhật ${editingMemberTarget.name}: Biệt danh “${trimmedNick || "Mặc định"}” · Quyền hạn: ${roleLabel}.`
    );
    setEditingMemberTarget(null);
    notifyChat(`Đã đồng bộ biệt danh & quyền hạn cho ${editingMemberTarget.name}!`);
  };

  // Xóa thành viên khỏi nhóm
  const handleRemoveMemberFromGroup = (member: GroupMember) => {
    const convId = currentConv.id;
    updateCurrentConv(c => ({
      ...c,
      members: c.members.filter(m => m.user !== member.user),
    }));
    appendSystemEvent(convId, `👋 ${member.name} (${member.user}) đã được mời ra khỏi nhóm.`);
    setEditingMemberTarget(null);
    notifyChat(`Đã xóa ${member.name} khỏi nhóm.`);
  };

  // Thêm thành viên mới vào nhóm (Trực tiếp hoặc đưa vào danh sách Chờ phê duyệt)
  const handleAddSelectedMembers = () => {
    if (selectedToAdd.length === 0) return;
    const convId = currentConv.id;
    const usersToAdd = allDirectoryUsers.filter(u => selectedToAdd.includes(u.name));

    if (addAsPendingMode && currentConv.requireApproval) {
      const newPendings: PendingGroupMember[] = usersToAdd.map(u => ({
        name: u.name,
        user: u.user,
        avatar: u.img,
        invitedBy: "Thành viên nhóm",
        requestedAt: "Vừa xong",
      }));
      updateCurrentConv(c => ({
        ...c,
        pendingMembers: [
          ...c.pendingMembers,
          ...newPendings.filter(np => !c.pendingMembers.some(ep => ep.user === np.user)),
        ],
      }));
      appendSystemEvent(convId, `⏳ ${usersToAdd.map(u => u.name).join(", ")} đang chờ Trưởng/Phó nhóm phê duyệt vào nhóm.`);
      notifyChat(`Đã thêm ${usersToAdd.length} người vào danh sách chờ phê duyệt!`);
    } else {
      const newMembers: GroupMember[] = usersToAdd.map(u => ({
        name: u.name,
        user: u.user,
        avatar: u.img,
        role: "MEMBER",
        nickname: "",
        online: u.online,
      }));
      updateCurrentConv(c => ({
        ...c,
        members: [...c.members, ...newMembers.filter(nm => !c.members.some(em => em.user === nm.user))],
      }));
      appendSystemEvent(convId, `🎉 Huy Nguyễn đã thêm ${usersToAdd.map(u => u.name).join(", ")} vào nhóm.`);
      notifyChat(`Đã thêm ${usersToAdd.length} thành viên mới vào nhóm theo thời gian thực!`);
    }

    setSelectedToAdd([]);
    setShowAddMemberModal(false);
  };

  // Phê duyệt hoặc Từ chối thành viên đang chờ duyệt
  const handleApprovePendingMember = (pending: PendingGroupMember) => {
    const convId = currentConv.id;
    updateCurrentConv(c => ({
      ...c,
      pendingMembers: c.pendingMembers.filter(p => p.user !== pending.user),
      members: c.members.some(m => m.user === pending.user)
        ? c.members
        : [
            ...c.members,
            {
              name: pending.name,
              user: pending.user,
              avatar: pending.avatar,
              role: "MEMBER",
              nickname: "",
              online: true,
            },
          ],
    }));
    appendSystemEvent(convId, `✅ Đã phê duyệt ${pending.name} (${pending.user}) trở thành thành viên chính thức của nhóm.`);
    notifyChat(`Đã phê duyệt ${pending.name} vào nhóm!`);
  };

  const handleRejectPendingMember = (pending: PendingGroupMember) => {
    updateCurrentConv(c => ({
      ...c,
      pendingMembers: c.pendingMembers.filter(p => p.user !== pending.user),
    }));
    notifyChat(`Đã từ chối yêu cầu tham gia nhóm của ${pending.name}.`);
  };

  const handleApproveAllPending = () => {
    if (currentConv.pendingMembers.length === 0) return;
    const convId = currentConv.id;
    const names = currentConv.pendingMembers.map(p => p.name).join(", ");
    updateCurrentConv(c => ({
      ...c,
      members: [
        ...c.members,
        ...c.pendingMembers
          .filter(p => !c.members.some(m => m.user === p.user))
          .map(p => ({
            name: p.name,
            user: p.user,
            avatar: p.avatar,
            role: "MEMBER" as GroupMemberRole,
            nickname: "",
            online: true,
          })),
      ],
      pendingMembers: [],
    }));
    appendSystemEvent(convId, `✅ Đã phê duyệt tất cả (${names}) vào nhóm.`);
    notifyChat("Đã phê duyệt toàn bộ thành viên đang chờ!");
  };

  // Bắt đầu & Kết thúc Chat Video Nhóm / 1-1
  const startCall = (mode: "VIDEO" | "AUDIO") => {
    setActiveCall({
      mode,
      isGroup: currentConv.group,
      title: currentConv.name,
      seconds: 0,
      micOn: true,
      camOn: mode === "VIDEO",
      screenShare: false,
      participants: currentConv.members,
    });
    appendSystemEvent(
      currentConv.id,
      `${mode === "VIDEO" ? "📹" : "📞"} Huy Nguyễn đã bắt đầu cuộc gọi ${mode === "VIDEO" ? "Video" : "Thoại"} ${
        currentConv.group ? "nhóm" : "1-1"
      }.`
    );
  };

  const endCall = () => {
    if (!activeCall) return;
    const mins = String(Math.floor(activeCall.seconds / 60)).padStart(2, "0");
    const secs = String(activeCall.seconds % 60).padStart(2, "0");
    appendSystemEvent(
      currentConv.id,
      `${activeCall.mode === "VIDEO" ? "📹" : "📞"} Cuộc gọi ${activeCall.mode === "VIDEO" ? "Video" : "Thoại"} ${
        activeCall.isGroup ? "nhóm" : "1-1"
      } đã kết thúc · Thời lượng ${mins}:${secs}.`
    );
    setActiveCall(null);
    notifyChat(`Đã kết thúc cuộc gọi (${mins}:${secs}).`);
  };

  const startDirectChatWith = (personName: string, avatarImg: string) => {
    const existingIdx = convList.findIndex(c => c.name === personName);
    if (existingIdx >= 0) {
      setActive(existingIdx);
    } else {
      const newConv: ConversationState = {
        id: `conv-${Date.now()}`,
        name: personName,
        text: "Bắt đầu cuộc trò chuyện 1-1 mới",
        img: avatarImg,
        count: 0,
        group: false,
        requireApproval: false,
        members: [
          { name: "Huy Nguyễn", user: "@huynguyen", avatar: photos.red, role: "LEADER", online: true },
          { name: personName, user: `@${personName.toLowerCase().replace(/\s+/g, "")}`, avatar: avatarImg, role: "MEMBER", online: true },
        ],
        pendingMembers: [],
        sharedMedia: [],
        messages: [],
      };
      broadcastAndSetConvList(prev => [newConv, ...prev]);
      setActive(0);
    }
    setShowFriendsModal(false);
  };

  const acceptRequest = (name: string) => {
    setReceivedRequests(receivedRequests.filter(x => x !== name));
    if (!friends.includes(name)) setFriends([...friends, name]);
    notifyChat(`Đã chấp nhận lời mời kết bạn từ ${name}.`);
  };

  const rejectRequest = (name: string) => {
    setReceivedRequests(receivedRequests.filter(x => x !== name));
    notifyChat(`Đã từ chối lời mời kết bạn của ${name}.`);
  };

  const cancelSentRequest = (name: string) => {
    setSentRequests(sentRequests.filter(x => x !== name));
    notifyChat(`Đã thu hồi lời mời kết bạn gửi tới ${name}.`);
  };

  const sendFriendRequest = (name: string) => {
    if (!sentRequests.includes(name)) setSentRequests([...sentRequests, name]);
    notifyChat(`Đã gửi lời mời kết bạn tới ${name}.`);
  };

  const removeFriend = (name: string) => {
    setFriends(friends.filter(x => x !== name));
    notifyChat(`Đã hủy kết bạn với ${name}.`);
  };

  const createNewGroupChat = () => {
    if (!newGroupName.trim()) return;
    const pickedMembers: GroupMember[] = [
      { name: "Huy Nguyễn", user: "@huynguyen", avatar: photos.red, role: "LEADER", nickname: "Trưởng nhóm", online: true },
      ...allDirectoryUsers
        .filter(u => newGroupMembers.includes(u.name))
        .map(u => ({
          name: u.name,
          user: u.user,
          avatar: u.img,
          role: "MEMBER" as GroupMemberRole,
          nickname: "",
          online: u.online,
        })),
    ];
    const created: ConversationState = {
      id: `group-${Date.now()}`,
      name: newGroupName.trim(),
      text: `Nhóm mới tạo · ${pickedMembers.length} thành viên`,
      img: photos.city,
      count: 0,
      group: true,
      requireApproval: true,
      members: pickedMembers,
      pendingMembers: [],
      sharedMedia: [],
      messages: [
        {
          id: `sys-init-${Date.now()}`,
          senderName: "Hệ thống",
          senderUser: "@system",
          senderAvatar: photos.red,
          isMe: false,
          time: nowTimeStr(),
          text: `🎉 Nhóm “${newGroupName.trim()}” đã được tạo với ${pickedMembers.length} thành viên.`,
          systemEvent: true,
        },
      ],
    };
    broadcastAndSetConvList(prev => [created, ...prev]);
    setActive(0);
    setNewGroupName("");
    setShowCreateGroup(false);
    notifyChat(`Đã tạo nhóm trò chuyện “${created.name}”.`);
  };

  const filteredConversations = convList.filter(c =>
    c.name.toLowerCase().includes(convQuery.toLowerCase()) ||
    c.text.toLowerCase().includes(convQuery.toLowerCase())
  );

  const allDirectoryUsers = [
    ...friendData,
    { name: "Hoàng Nam", user: "@hoangnam", bio: "Fan cứng Sci-Fi & Cyberpunk.", img: photos.alley, online: true },
    { name: "Khánh Linh", user: "@khanhlinh", bio: "Thích đọc manhwa lãng mạn, giả tưởng.", img: photos.red, online: false },
    { name: "Bảo Ngọc", user: "@baongoc", bio: "Sưu tầm artbook & nhạc phim Ghibli.", img: photos.lantern, online: true },
  ];

  const filteredDirectory = allDirectoryUsers.filter(u =>
    (!friendSearchQuery || `${u.name} ${u.user}`.toLowerCase().includes(friendSearchQuery.toLowerCase())) &&
    (!onlineOnly || u.online)
  );

  // Tìm biệt danh & vai trò thực tế của người gửi trong nhóm hiện tại
  const resolveSenderDisplay = (senderName: string, senderUser: string) => {
    const found = currentConv.members.find(m => m.user === senderUser || m.name === senderName);
    if (!found) return { displayName: senderName, role: "MEMBER" as GroupMemberRole, realName: senderName };
    return {
      displayName: found.nickname ? `${found.nickname} (${found.name})` : found.name,
      role: found.role,
      realName: found.name,
    };
  };

  const visibleMessages = currentConv.messages.filter(m =>
    !inChatSearch.trim() ||
    (m.text && m.text.toLowerCase().includes(inChatSearch.toLowerCase())) ||
    m.senderName.toLowerCase().includes(inChatSearch.toLowerCase())
  );

  const onlineMembersCount = currentConv.members.filter(m => m.online).length;

  return <main className="chat-page">
    <aside className="chat-left">
      <div className="chat-profile">
        <div className="avatar"><img src={photos.red} alt="" /><i /></div>
        <div><b>Tin nhắn</b><span>{friends.length} bạn bè · Đồng bộ Realtime ●</span></div>
        <button
          className={`icon-btn ${showFriendsModal ? "active" : ""}`}
          title="Danh sách bạn bè, lời mời kết bạn & tìm kiếm người dùng"
          onClick={() => setShowFriendsModal(true)}
        >
          <Icon name="users" size={17} />
          {receivedRequests.length > 0 && <span className="friend-req-badge">{receivedRequests.length}</span>}
        </button>
        <button className="icon-btn" title="Mở trang Bạn bè đầy đủ" onClick={() => setPage("friends")}><Icon name="settings" size={16} /></button>
      </div>

      <label className="chat-search">
        <Icon name="search" size={16} />
        <input value={convQuery} onChange={e => setConvQuery(e.target.value)} placeholder="Tìm kiếm cuộc trò chuyện..." />
      </label>

      <Button icon="plus" className="create-chat" onClick={() => setShowCreateGroup(true)}>Tạo nhóm chat</Button>

      <div className="conversation-head">
        <span>CUỘC TRÒ CHUYỆN ({filteredConversations.length})</span>
        <button title="Tìm bạn bè để nhắn tin" onClick={() => setShowFriendsModal(true)}><Icon name="users" size={15} /></button>
      </div>

      <div className="conversation-list">
        {filteredConversations.map(c => {
          const realIndex = convList.findIndex(item => item.id === c.id);
          return (
            <button
              className={active === realIndex ? "active" : ""}
              onClick={() => {
                setActive(realIndex);
                broadcastAndSetConvList(prev => prev.map((item, idx) => (idx === realIndex ? { ...item, count: 0 } : item)));
              }}
              key={c.id}
            >
              <div className="conv-avatar"><img src={c.img} alt="" /><i /></div>
              <div>
                <b>{c.name}</b>
                <p>{c.text}</p>
              </div>
              <aside>
                <time>{c.messages[c.messages.length - 1]?.time || "20:20"}</time>
                {c.count > 0 && <span>{c.count}</span>}
              </aside>
            </button>
          );
        })}
      </div>
    </aside>

    <section className="chat-center">
      <header>
        <div className="conv-avatar" style={{ cursor: "pointer" }} onClick={() => currentConv.group && setShowAvatarModal(true)}>
          <img src={currentConv.img} alt="" />
          <i />
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <b>{currentConv.name}</b>
            {currentConv.group && (
              <button
                type="button"
                className="inline-rename-trigger"
                title="Đổi tên nhóm"
                onClick={() => {
                  setRenameInput(currentConv.name);
                  setShowRenameModal(true);
                }}
              >
                <Icon name="edit" size={13} />
              </button>
            )}
            <span className="realtime-pill">● Realtime</span>
          </div>
          <span>
            <i />{" "}
            {currentConv.group
              ? `${currentConv.members.length} thành viên · ${onlineMembersCount} đang online${
                  currentConv.pendingMembers.length > 0 ? ` · ${currentConv.pendingMembers.length} chờ duyệt` : ""
                }`
              : "Đang hoạt động · Trò chuyện 1-1"}
          </span>
        </div>
        <div className="chat-head-actions">
          <button
            className="call-action-btn audio"
            title={currentConv.group ? "Gọi thoại nhóm" : "Gọi thoại 1-1"}
            onClick={() => startCall("AUDIO")}
          >
            📞 <span>Gọi thoại</span>
          </button>
          <button
            className="call-action-btn video"
            title={currentConv.group ? "Chat Video Nhóm" : "Chat Video 1-1"}
            onClick={() => startCall("VIDEO")}
          >
            📹 <span>Video Call</span>
          </button>
          {currentConv.group && (
            <button
              className="icon-btn"
              title="Thêm thành viên vào nhóm"
              onClick={() => setShowAddMemberModal(true)}
            >
              <Icon name="users" size={17} />
              {currentConv.pendingMembers.length > 0 && (
                <span className="friend-req-badge">{currentConv.pendingMembers.length}</span>
              )}
            </button>
          )}
          <button
            className={`icon-btn ${showInChatSearch ? "active" : ""}`}
            title="Tìm kiếm tin nhắn trong hội thoại"
            onClick={() => setShowInChatSearch(!showInChatSearch)}
          >
            <Icon name="search" />
          </button>
        </div>
      </header>

      {showInChatSearch && (
        <div className="in-chat-search-bar">
          <Icon name="search" size={15} />
          <input
            value={inChatSearch}
            onChange={e => setInChatSearch(e.target.value)}
            placeholder="Nhập từ khóa để lọc tin nhắn trong cuộc trò chuyện này..."
          />
          {inChatSearch && <button onClick={() => setInChatSearch("")}>Xóa</button>}
        </div>
      )}

      <div className="message-stream">
        {chatToast && (
          <div className="success-banner" style={{ marginBottom: "12px" }}>
            <Icon name="check" /> {chatToast}
            <button onClick={() => setChatToast("")}>×</button>
          </div>
        )}
        <div className="day-line"><span>HÔM NAY · ĐỒNG BỘ THỜI GIAN THỰC</span></div>

        {visibleMessages.map(m => {
          if (m.systemEvent) {
            return (
              <div className="chat-system-event" key={m.id}>
                <span>{m.text} · <time>{m.time}</time></span>
              </div>
            );
          }

          const senderInfo = resolveSenderDisplay(m.senderName, m.senderUser);
          const roleBadge =
            currentConv.group && senderInfo.role === "LEADER"
              ? "👑 Trưởng nhóm"
              : currentConv.group && senderInfo.role === "ADMIN"
              ? "🛡️ Phó nhóm"
              : "";

          return (
            <div className={`msg ${m.isMe ? "me" : "other"}`} key={m.id}>
              {!m.isMe && (
                <img
                  src={m.senderAvatar}
                  alt={m.senderName}
                  style={{ cursor: "pointer" }}
                  onClick={() => onOpenPublicProfile?.(m.senderUser)}
                />
              )}
              <div>
                <span>
                  {m.isMe ? `Bạn (${senderInfo.displayName})` : senderInfo.displayName}
                  {roleBadge && <em className={`msg-role-tag ${senderInfo.role.toLowerCase()}`}>{roleBadge}</em>}
                  {" · "}
                  {m.time}
                  {m.isMe && !m.revoked && (
                    <button
                      type="button"
                      className="revoke-inline-btn"
                      title="Thu hồi tin nhắn"
                      onClick={() => revokeMessage(m.id)}
                    >
                      Thu hồi
                    </button>
                  )}
                </span>

                {m.revoked ? (
                  <p className="revoked">⊘ &nbsp; Tin nhắn đã bị thu hồi</p>
                ) : (
                  <>
                    {m.text && <p>{m.text}</p>}

                    {/* Hiển thị tệp / hình ảnh / video đính kèm */}
                    {m.attachments && m.attachments.length > 0 && (
                      <div className="msg-attachments">
                        {m.attachments.map(att => {
                          if (att.kind === "IMAGE") {
                            return (
                              <div className="att-image-card" key={att.id} onClick={() => setLightboxImage(att.url)}>
                                <img src={att.url} alt={att.name} />
                                <span>🔍 {att.name} ({att.sizeLabel})</span>
                              </div>
                            );
                          }
                          if (att.kind === "VIDEO") {
                            return (
                              <div className="att-video-card" key={att.id}>
                                <video src={att.url} controls preload="metadata" />
                                <span>🎬 {att.name} ({att.sizeLabel})</span>
                              </div>
                            );
                          }
                          return (
                            <div className="att-file-card" key={att.id}>
                              <div className="att-file-icon">📄</div>
                              <div className="att-file-meta">
                                <b>{att.name}</b>
                                <small>{att.sizeLabel}</small>
                              </div>
                              <a
                                href={att.url}
                                download={att.name}
                                className="btn btn-secondary"
                                onClick={e => {
                                  if (att.url === "#") {
                                    e.preventDefault();
                                    notifyChat(`Đã bắt đầu tải xuống tệp “${att.name}”!`);
                                  }
                                }}
                              >
                                Tải xuống
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Hiển thị thẻ chia sẻ truyện/phim */}
                    {m.sharedContent && (
                      <div className="shared-card">
                        <img src={m.sharedContent.img} alt={m.sharedContent.title} />
                        <div>
                          <small>{m.sharedContent.typeLabel}</small>
                          <b>{m.sharedContent.title}</b>
                          <div className="mini-rating">★ {m.sharedContent.score} / 5</div>
                          <p>{m.sharedContent.desc}</p>
                          <div>
                            <Button variant="secondary" onClick={() => setPage("detail")}>Xem chi tiết</Button>
                            <Button
                              icon="plus"
                              onClick={() => {
                                onSaveSharedToLibrary?.({
                                  title: m.sharedContent!.title,
                                  sub: m.sharedContent!.typeLabel,
                                  img: m.sharedContent!.img,
                                  status: "Muốn đọc / xem",
                                  score: m.sharedContent!.score,
                                  type: m.sharedContent!.typeLabel.includes("PHIM") ? "Phim" : "Truyện",
                                  genres: ["Sci-Fi", "Mystery"],
                                  sharedFrom: {
                                    name: m.senderName,
                                    user: m.senderUser,
                                    sharedAt: `Lưu từ nhóm ${currentConv.name}`,
                                  },
                                });
                                notifyChat(`Đã lưu “${m.sharedContent!.title}” (chia sẻ bởi ${m.senderName}) vào Thư viện của tôi!`);
                              }}
                            >
                              Lưu vào thư viện
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {m.isMe && <small>{m.status || "Đã gửi"}</small>}
              </div>
            </div>
          );
        })}

        <div className="private-card">
          <Icon name="lock" />
          <div>
            <b>Nội dung riêng tư chưa được cấp quyền</b>
            <p>Yêu cầu chủ sở hữu cấp quyền để xem nội dung này.</p>
          </div>
          <button onClick={() => notifyChat("Đã gửi yêu cầu cấp quyền truy cập cho chủ sở hữu.")}>Gửi yêu cầu</button>
        </div>

        {typingUser && (
          <div className="typing-indicator-row">
            <span className="typing-dots"><i /><i /><i /></span>
            <b>{typingUser}</b> đang soạn tin nhắn...
          </div>
        )}
      </div>

      {/* Thanh xem trước tệp / ảnh / video đính kèm trước khi gửi */}
      {stagedAttachments.length > 0 && (
        <div className="staged-attachments-bar">
          {stagedAttachments.map(att => (
            <div className="staged-chip" key={att.id}>
              <span>{att.kind === "IMAGE" ? "🖼️" : att.kind === "VIDEO" ? "🎬" : "📎"}</span>
              <b>{att.name}</b>
              <small>({att.sizeLabel})</small>
              <button
                type="button"
                onClick={() => setStagedAttachments(prev => prev.filter(x => x.id !== att.id))}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className="clear-staged-btn" onClick={() => setStagedAttachments([])}>
            Xóa tất cả
          </button>
        </div>
      )}

      {/* Menu chọn nhanh Ảnh / Video / Tệp mẫu nếu không muốn mở hộp thoại File máy tính */}
      {showSampleMediaPicker && (
        <div className="sample-media-popover">
          <div className="sample-media-head">
            <b>Gửi nhanh Tệp / Hình ảnh / Video</b>
            <button type="button" onClick={() => setShowSampleMediaPicker(false)}>×</button>
          </div>
          <div className="sample-media-actions">
            <button
              type="button"
              onClick={() => {
                setStagedAttachments(prev => [
                  ...prev,
                  {
                    id: `img-${Date.now()}`,
                    kind: "IMAGE",
                    name: "Poster_Cyberpunk_2026.jpg",
                    url: photos.city,
                    sizeLabel: "1.2 MB · ẢNH",
                  },
                ]);
                setShowSampleMediaPicker(false);
              }}
            >
              🖼️ Đính kèm Ảnh Poster mẫu
            </button>
            <button
              type="button"
              onClick={() => {
                setStagedAttachments(prev => [
                  ...prev,
                  {
                    id: `vid-${Date.now()}`,
                    kind: "VIDEO",
                    name: "Trailer_Nightfall_City_Official.mp4",
                    url: SAMPLE_VIDEO_URL,
                    sizeLabel: "8.4 MB · VIDEO MP4",
                  },
                ]);
                setShowSampleMediaPicker(false);
              }}
            >
              🎬 Đính kèm Video Trailer mẫu
            </button>
            <button
              type="button"
              onClick={() => {
                setStagedAttachments(prev => [
                  ...prev,
                  {
                    id: `file-${Date.now()}`,
                    kind: "FILE",
                    name: "Danh_Sach_Truyen_De_Cu_2026.pdf",
                    url: "#",
                    sizeLabel: "1.8 MB · PDF",
                  },
                ]);
                setShowSampleMediaPicker(false);
              }}
            >
              📄 Đính kèm Tệp PDF mẫu
            </button>
          </div>
        </div>
      )}

      <div className="composer">
        <div className="composer-tools">
          <button
            type="button"
            title="Chia sẻ truyện/phim từ thư viện vào khung chat"
            onClick={() => (onOpenShareToChat ? onOpenShareToChat() : null)}
          >
            ＋
          </button>
          <label className="composer-upload-btn" title="Tải lên Hình ảnh, Video hoặc Tệp đính kèm từ máy tính">
            📎
            <input
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx,.zip,.txt"
              onChange={e => handleFileUpload(e.target.files)}
            />
          </label>
          <button
            type="button"
            title="Chọn nhanh Hình ảnh / Video / Tệp mẫu"
            onClick={() => setShowSampleMediaPicker(!showSampleMediaPicker)}
          >
            🎬
          </button>
          <button
            type="button"
            title="Gửi nhãn dán GIF"
            onClick={() => {
              setMessage("🎬 [GIF] Tuyệt vời quá!");
            }}
          >
            GIF
          </button>
          <button
            type="button"
            title="Thả cảm xúc nhanh"
            onClick={() => {
              setMessage("❤️ Bộ này hay xuất sắc luôn!");
            }}
          >
            ♡
          </button>
        </div>
        <div className="composer-input">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={`Nhập tin nhắn, gửi ảnh/video/tệp tới ${currentConv.name}...`}
          />
          <span>Enter để gửi</span>
        </div>
        <button className="send-btn" onClick={send} title="Gửi tin nhắn">
          <Icon name="send" size={16} />
        </button>
      </div>
    </section>

    <aside className="chat-right">
      <div className="group-info">
        <div
          className="large-group-avatar"
          style={{ cursor: "pointer" }}
          title="Nhấn để đổi ảnh đại diện nhóm"
          onClick={() => setShowAvatarModal(true)}
        >
          <img src={currentConv.img} alt={currentConv.name} />
          <button type="button" onClick={e => { e.stopPropagation(); setShowAvatarModal(true); }}>
            <Icon name="edit" size={15} />
          </button>
        </div>
        <h2>{currentConv.name}</h2>
        <p>{currentConv.group ? `${currentConv.members.length} thành viên · Nhóm thảo luận` : "Trò chuyện cá nhân 1-1"}</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
          {currentConv.group ? (
            <>
              <Button
                variant="secondary"
                icon="edit"
                onClick={() => {
                  setRenameInput(currentConv.name);
                  setShowRenameModal(true);
                }}
              >
                Đổi tên nhóm
              </Button>
              <Button variant="ghost" onClick={() => setShowAvatarModal(true)}>
                Đổi ảnh nhóm
              </Button>
            </>
          ) : (
            <Button variant="secondary" icon="users" onClick={() => onOpenPublicProfile?.("@lananh")}>
              Xem trang cá nhân
            </Button>
          )}
        </div>
      </div>

      {/* Khu vực Phê duyệt thành viên nhóm (Chỉ hiển thị cho Nhóm) */}
      {currentConv.group && (
        <div className="group-approval-box">
          <div className="approval-head">
            <div>
              <b>Phê duyệt thành viên</b>
              <small>{currentConv.requireApproval ? "Đang bật kiểm duyệt" : "Vào nhóm tự do"}</small>
            </div>
            <Toggle
              on={currentConv.requireApproval}
              setOn={val => {
                updateCurrentConv(c => ({ ...c, requireApproval: val }));
                appendSystemEvent(
                  currentConv.id,
                  `🛡️ Chế độ phê duyệt thành viên mới đã được ${val ? "BẬT" : "TẮT"}.`
                );
              }}
            />
          </div>

          <button
            type="button"
            className="pending-approval-trigger"
            onClick={() => setShowApprovalModal(true)}
          >
            <span>Danh sách chờ phê duyệt</span>
            <b className={currentConv.pendingMembers.length > 0 ? "has-pending" : ""}>
              {currentConv.pendingMembers.length} yêu cầu
            </b>
          </button>
        </div>
      )}

      {/* Ảnh, poster & video đã chia sẻ (tự động cập nhật khi gửi ảnh/video) */}
      <div className="info-block">
        <button type="button">
          <span>Ảnh, video & tệp đã chia sẻ ({currentConv.sharedMedia.length})</span>
          <Icon name="chevron" />
        </button>
        <div className="media-row">
          {currentConv.sharedMedia.slice(0, 6).map(med => (
            <img
              key={med.id}
              src={med.kind === "VIDEO" ? photos.city : med.url}
              alt={med.title}
              title={med.title}
              style={{ cursor: "pointer" }}
              onClick={() => setLightboxImage(med.kind === "VIDEO" ? photos.city : med.url)}
            />
          ))}
        </div>
      </div>

      {/* Danh sách thành viên nhóm kèm Biệt danh & Phân quyền */}
      <div className="members">
        <div>
          <span>THÀNH VIÊN · {currentConv.members.length}</span>
          {currentConv.group && (
            <button type="button" onClick={() => setShowAddMemberModal(true)}>
              + Thêm
            </button>
          )}
        </div>
        {currentConv.members.map(m => (
          <div className="member" key={m.user}>
            <div className="conv-avatar" style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(m.user)}>
              <img src={m.avatar} alt={m.name} />
              <i style={{ background: m.online ? "#36d092" : "#625b6b" }} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <b style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {m.nickname ? `${m.nickname}` : m.name}
              </b>
              <span className={m.role === "LEADER" ? "leader" : m.role === "ADMIN" ? "deputy-role" : ""}>
                {m.role === "LEADER" ? "👑 Trưởng nhóm" : m.role === "ADMIN" ? "🛡️ Phó nhóm" : "Thành viên"}
                {m.nickname ? ` · ${m.name}` : ""}
              </span>
            </div>
            <button
              type="button"
              title="Đặt biệt danh & Phân quyền thành viên"
              onClick={() => {
                setEditingMemberTarget(m);
                setNicknameInput(m.nickname || "");
                setRoleInput(m.role);
              }}
            >
              <Icon name="more" size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        className="leave-group"
        onClick={() => {
          if (currentConv.group) {
            notifyChat(`Bạn đã rời khỏi nhóm “${currentConv.name}”.`);
          } else {
            updateCurrentConv(c => ({ ...c, messages: [] }));
            notifyChat("Đã xóa lịch sử trò chuyện.");
          }
        }}
      >
        {currentConv.group ? "Rời khỏi nhóm" : "Xóa lịch sử trò chuyện"}
      </button>
    </aside>

    {/* MODAL 1: ĐỔI TÊN NHÓM THỜI GIAN THỰC */}
    {showRenameModal && (
      <div className="modal-backdrop" onMouseDown={() => setShowRenameModal(false)}>
        <div className="share-modal admin-modal" style={{ maxWidth: "440px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>CÀI ĐẶT NHÓM</span>
              <h2>Đổi tên nhóm trò chuyện</h2>
              <p>Tên mới sẽ được cập nhật đồng bộ theo thời gian thực cho toàn bộ thành viên.</p>
            </div>
            <button className="icon-btn" onClick={() => setShowRenameModal(false)}><Icon name="x" /></button>
          </div>
          <label className="admin-field">
            <span>Tên nhóm mới *</span>
            <input
              value={renameInput}
              onChange={e => setRenameInput(e.target.value)}
              placeholder="Nhập tên nhóm mới..."
              autoFocus
            />
          </label>
          <div className="modal-actions">
            <div />
            <div>
              <Button variant="ghost" onClick={() => setShowRenameModal(false)}>Hủy</Button>
              <Button icon="check" onClick={handleConfirmRenameGroup}>Lưu tên nhóm</Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 2: ĐỔI ẢNH ĐẠI DIỆN NHÓM THỜI GIAN THỰC */}
    {showAvatarModal && (
      <div className="modal-backdrop" onMouseDown={() => setShowAvatarModal(false)}>
        <div className="share-modal admin-modal" style={{ maxWidth: "480px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>ẢNH ĐẠI DIỆN NHÓM</span>
              <h2>Đổi ảnh đại diện “{currentConv.name}”</h2>
              <p>Tải ảnh từ máy tính hoặc chọn nhanh từ bộ sưu tập chủ đề Anime & Điện ảnh.</p>
            </div>
            <button className="icon-btn" onClick={() => setShowAvatarModal(false)}><Icon name="x" /></button>
          </div>

          <div className="avatar-preset-grid">
            {[photos.city, photos.red, photos.rain, photos.lantern, photos.alley, photos.street, photos.hero].map((pUrl, idx) => (
              <button
                key={idx}
                type="button"
                className={`avatar-preset-item ${currentConv.img === pUrl ? "active" : ""}`}
                onClick={() => handleConfirmChangeAvatar(pUrl)}
              >
                <img src={pUrl} alt={`Preset ${idx + 1}`} />
              </button>
            ))}
          </div>

          <label className="admin-field" style={{ marginTop: "12px" }}>
            <span>Hoặc tải ảnh lên từ thiết bị của bạn</span>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => handleConfirmChangeAvatar(String(reader.result));
                reader.readAsDataURL(file);
              }}
            />
          </label>

          <label className="admin-field" style={{ marginTop: "8px" }}>
            <span>Hoặc dán đường dẫn URL hình ảnh</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                value={customAvatarUrl}
                onChange={e => setCustomAvatarUrl(e.target.value)}
                placeholder="https://..."
                style={{ flex: 1 }}
              />
              <Button onClick={() => handleConfirmChangeAvatar(customAvatarUrl)}>Áp dụng</Button>
            </div>
          </label>
        </div>
      </div>
    )}

    {/* MODAL 3: ĐẶT BIỆT DANH & PHÂN QUYỀN THÀNH VIÊN NHÓM */}
    {editingMemberTarget && (
      <div className="modal-backdrop" onMouseDown={() => setEditingMemberTarget(null)}>
        <div className="share-modal admin-modal" style={{ maxWidth: "460px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>BIỆT DANH & PHÂN QUYỀN NHÓM</span>
              <h2>{editingMemberTarget.name} ({editingMemberTarget.user})</h2>
              <p>Chỉnh sửa biệt danh hiển thị trong nhóm và cấp quyền quản trị viên nhóm.</p>
            </div>
            <button className="icon-btn" onClick={() => setEditingMemberTarget(null)}><Icon name="x" /></button>
          </div>

          <label className="admin-field">
            <span>Biệt danh trong nhóm (Nickname)</span>
            <input
              value={nicknameInput}
              onChange={e => setNicknameInput(e.target.value)}
              placeholder={`Mặc định: ${editingMemberTarget.name}`}
            />
          </label>

          <label className="admin-field" style={{ marginTop: "10px" }}>
            <span>Phân quyền trong nhóm</span>
            <select value={roleInput} onChange={e => setRoleInput(e.target.value as GroupMemberRole)}>
              <option value="LEADER">👑 Trưởng nhóm (Toàn quyền quản lý nhóm)</option>
              <option value="ADMIN">🛡️ Phó nhóm / Quản trị viên (Duyệt & thêm thành viên, đổi thông tin nhóm)</option>
              <option value="MEMBER">👤 Thành viên (Gửi tin nhắn, ảnh, video, gọi nhóm)</option>
            </select>
          </label>

          <div className="modal-actions" style={{ marginTop: "14px" }}>
            {editingMemberTarget.user !== "@huynguyen" ? (
              <Button variant="danger" onClick={() => handleRemoveMemberFromGroup(editingMemberTarget)}>
                Mời ra khỏi nhóm
              </Button>
            ) : <div />}
            <div>
              <Button variant="ghost" onClick={() => setEditingMemberTarget(null)}>Hủy</Button>
              <Button icon="check" onClick={handleSaveMemberSettings}>Lưu thay đổi</Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 4: THÊM THÀNH VIÊN VÀO NHÓM */}
    {showAddMemberModal && (
      <div className="modal-backdrop" onMouseDown={() => setShowAddMemberModal(false)}>
        <div className="share-modal admin-modal" style={{ maxWidth: "500px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>THÀNH VIÊN NHÓM</span>
              <h2>Thêm thành viên vào “{currentConv.name}”</h2>
              <p>Chọn bạn bè hoặc tìm kiếm người dùng để mời vào nhóm trò chuyện.</p>
            </div>
            <button className="icon-btn" onClick={() => setShowAddMemberModal(false)}><Icon name="x" /></button>
          </div>

          <label className="admin-field">
            <span>Tìm kiếm người dùng theo tên hoặc @username</span>
            <input
              value={addMemberQuery}
              onChange={e => setAddMemberQuery(e.target.value)}
              placeholder="Nhập tên bạn bè..."
            />
          </label>

          <div className="assign-list">
            {allDirectoryUsers
              .filter(u => `${u.name} ${u.user}`.toLowerCase().includes(addMemberQuery.toLowerCase()))
              .map(u => {
                const alreadyInGroup = currentConv.members.some(m => m.user === u.user || m.name === u.name);
                const alreadyPending = currentConv.pendingMembers.some(p => p.user === u.user || p.name === u.name);
                const picked = selectedToAdd.includes(u.name);
                return (
                  <div className={`assign-row ${picked ? "assigned" : ""}`} key={u.user}>
                    <div className="assign-row-left">
                      <img src={u.img} alt={u.name} style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
                      <div>
                        <b>{u.name} <small style={{ color: "#9c70f8" }}>{u.user}</small></b>
                        <span>{u.bio}</span>
                      </div>
                    </div>
                    {alreadyInGroup ? (
                      <span className="badge-pill active">Đã trong nhóm</span>
                    ) : alreadyPending ? (
                      <span className="badge-pill pending">Đang chờ duyệt</span>
                    ) : (
                      <Button
                        variant={picked ? "primary" : "secondary"}
                        icon={picked ? "check" : "plus"}
                        onClick={() =>
                          setSelectedToAdd(prev =>
                            prev.includes(u.name) ? prev.filter(x => x !== u.name) : [...prev, u.name]
                          )
                        }
                      >
                        {picked ? "Đã chọn" : "Chọn"}
                      </Button>
                    )}
                  </div>
                );
              })}
          </div>

          {currentConv.requireApproval && (
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: "#b7acc7", marginTop: "6px" }}>
              <input
                type="checkbox"
                checked={addAsPendingMode}
                onChange={e => setAddAsPendingMode(e.target.checked)}
              />
              Đưa vào danh sách <b>Chờ phê duyệt</b> (mô phỏng lời mời từ thành viên thường)
            </label>
          )}

          <div className="modal-actions">
            <span style={{ fontSize: "10px", color: "#9e93ad" }}>Đã chọn {selectedToAdd.length} người</span>
            <div>
              <Button variant="ghost" onClick={() => setShowAddMemberModal(false)}>Hủy</Button>
              <Button icon="plus" onClick={handleAddSelectedMembers}>
                {addAsPendingMode && currentConv.requireApproval ? "Gửi yêu cầu duyệt" : "Thêm vào nhóm ngay"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 5: PHÊ DUYỆT THÀNH VIÊN NHÓM */}
    {showApprovalModal && (
      <div className="modal-backdrop" onMouseDown={() => setShowApprovalModal(false)}>
        <div className="share-modal admin-modal" style={{ maxWidth: "520px" }} onMouseDown={e => e.stopPropagation()}>
          <div className="modal-head">
            <div>
              <span>KIỂM DUYỆT THÀNH VIÊN</span>
              <h2>Phê duyệt thành viên ({currentConv.pendingMembers.length})</h2>
              <p>Chỉ Trưởng nhóm và Phó nhóm mới có quyền duyệt hoặc từ chối yêu cầu tham gia.</p>
            </div>
            <button className="icon-btn" onClick={() => setShowApprovalModal(false)}><Icon name="x" /></button>
          </div>

          {currentConv.pendingMembers.length === 0 ? (
            <div className="empty-results" style={{ height: "150px" }}>
              <Icon name="check" size={26} />
              <b>Không có yêu cầu nào đang chờ phê duyệt</b>
              <p>Tất cả yêu cầu tham gia nhóm “{currentConv.name}” đã được xử lý.</p>
            </div>
          ) : (
            <div className="assign-list">
              {currentConv.pendingMembers.map(p => (
                <div className="assign-row" key={p.user}>
                  <div className="assign-row-left">
                    <img src={p.avatar} alt={p.name} style={{ width: "38px", height: "38px", borderRadius: "50%" }} />
                    <div>
                      <b>{p.name} <small style={{ color: "#9c70f8" }}>{p.user}</small></b>
                      <span>Được mời bởi {p.invitedBy} · {p.requestedAt}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <Button icon="check" onClick={() => handleApprovePendingMember(p)}>Duyệt</Button>
                    <Button variant="danger" onClick={() => handleRejectPendingMember(p)}>Từ chối</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="modal-actions">
            {currentConv.pendingMembers.length > 0 ? (
              <Button variant="secondary" icon="check" onClick={handleApproveAllPending}>
                Duyệt tất cả ({currentConv.pendingMembers.length})
              </Button>
            ) : <div />}
            <Button onClick={() => setShowApprovalModal(false)}>Đóng</Button>
          </div>
        </div>
      </div>
    )}

    {/* MODAL 6: CHAT VIDEO NHÓM / 1-1 THỜI GIAN THỰC */}
    {activeCall && (
      <div className="modal-backdrop">
        <div className="video-call-modal" onMouseDown={e => e.stopPropagation()}>
          <div className="video-call-header">
            <div>
              <span className="live-call-badge">● TRỰC TIẾP · {activeCall.isGroup ? "CUỘC GỌI NHÓM" : "CUỘC GỌI 1-1"}</span>
              <h3>{activeCall.title}</h3>
            </div>
            <div className="call-timer">
              {String(Math.floor(activeCall.seconds / 60)).padStart(2, "0")}:
              {String(activeCall.seconds % 60).padStart(2, "0")}
            </div>
          </div>

          <div className={`video-call-grid ${activeCall.isGroup ? "group-grid" : "one-on-one-grid"}`}>
            {activeCall.participants.map((part, idx) => {
              const isSelf = part.user === "@huynguyen";
              return (
                <div className={`video-participant-tile ${idx === 0 ? "speaking" : ""}`} key={part.user}>
                  {activeCall.camOn || !isSelf ? (
                    <img className="video-feed-sim" src={part.avatar} alt={part.name} />
                  ) : (
                    <div className="camera-off-placeholder">
                      <img src={part.avatar} alt={part.name} />
                      <span>Đã tắt Camera</span>
                    </div>
                  )}
                  {activeCall.screenShare && isSelf && (
                    <div className="screen-share-overlay">🖥️ Đang chia sẻ màn hình xem phim/truyện chung</div>
                  )}
                  <div className="participant-label">
                    <b>{part.nickname || part.name} {isSelf && "(Bạn)"}</b>
                    <span>{part.role === "LEADER" ? "👑" : part.role === "ADMIN" ? "🛡️" : ""} {isSelf && !activeCall.micOn ? "🔇 Đã tắt Mic" : "🎙️ Đang nói"}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="video-call-controls">
            <button
              type="button"
              className={`call-ctrl-btn ${!activeCall.micOn ? "muted" : ""}`}
              onClick={() => setActiveCall({ ...activeCall, micOn: !activeCall.micOn })}
            >
              {activeCall.micOn ? "🎤 Tắt Mic" : "🔇 Bật Mic"}
            </button>
            <button
              type="button"
              className={`call-ctrl-btn ${!activeCall.camOn ? "muted" : ""}`}
              onClick={() => setActiveCall({ ...activeCall, camOn: !activeCall.camOn })}
            >
              {activeCall.camOn ? "📹 Tắt Camera" : "🚫 Bật Camera"}
            </button>
            <button
              type="button"
              className={`call-ctrl-btn ${activeCall.screenShare ? "active-share" : ""}`}
              onClick={() => setActiveCall({ ...activeCall, screenShare: !activeCall.screenShare })}
            >
              🖥️ {activeCall.screenShare ? "Dừng chia sẻ màn hình" : "Chia sẻ màn hình"}
            </button>
            {activeCall.isGroup && (
              <button
                type="button"
                className="call-ctrl-btn"
                onClick={() => setShowAddMemberModal(true)}
              >
                ➕ Mời thêm người
              </button>
            )}
            <button type="button" className="call-ctrl-btn hangup" onClick={endCall}>
              📞 Kết thúc cuộc gọi
            </button>
          </div>
        </div>
      </div>
    )}

    {/* LIGHTBOX XEM ẢNH PHÓNG TO */}
    {lightboxImage && (
      <div className="modal-backdrop" onMouseDown={() => setLightboxImage(null)}>
        <div className="lightbox-box" onMouseDown={e => e.stopPropagation()}>
          <img src={lightboxImage} alt="Xem phóng to" />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "10px" }}>
            <Button variant="secondary" onClick={() => setLightboxImage(null)}>Đóng</Button>
          </div>
        </div>
      </div>
    )}

    {/* MODAL DANH SÁCH BẠN BÈ, LỜI MỜI ĐÃ NHẬN / ĐÃ GỬI & TÌM KIẾM THEO TÊN */}
    {showFriendsModal && <div className="modal-backdrop" onMouseDown={() => setShowFriendsModal(false)}>
      <div className="chat-friends-modal" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head" style={{ marginBottom: "12px" }}>
          <div>
            <span>KẾT NỐI & TRÒ CHUYỆN</span>
            <h2>Bạn bè & Lời mời kết bạn</h2>
            <p>Tìm kiếm người dùng theo tên/@username, quản lý lời mời kết bạn và bắt đầu nhắn tin 1-1.</p>
          </div>
          <button className="icon-btn" onClick={() => setShowFriendsModal(false)}><Icon name="x" /></button>
        </div>

        {chatToast && <div className="success-banner" style={{ marginBottom: "10px" }}><Icon name="check" /> {chatToast}<button onClick={() => setChatToast("")}>×</button></div>}

        <div className="find-toolbar" style={{ marginBottom: "10px" }}>
          <label className="friend-search">
            <Icon name="search" size={16} />
            <input
              value={friendSearchQuery}
              onChange={e => setFriendSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bạn bè hoặc người dùng theo tên, @username..."
            />
            {friendSearchQuery && <button onClick={() => setFriendSearchQuery("")} style={{ border: 0, background: "none", color: "#9c70f8", fontSize: "9px" }}>Xóa</button>}
          </label>
          <label className="online-filter">
            <input type="checkbox" checked={onlineOnly} onChange={e => setOnlineOnly(e.target.checked)} /> Chỉ hiển thị đang online
          </label>
        </div>

        <div className="chat-friends-tabs">
          <button className={friendModalTab === "friends" ? "active" : ""} onClick={() => setFriendModalTab("friends")}>
            Danh sách bạn bè <span>{friends.length}</span>
          </button>
          <button className={friendModalTab === "received" ? "active" : ""} onClick={() => setFriendModalTab("received")}>
            Lời mời đã nhận {receivedRequests.length > 0 && <span style={{ background: "#ef4444" }}>{receivedRequests.length}</span>}
          </button>
          <button className={friendModalTab === "sent" ? "active" : ""} onClick={() => setFriendModalTab("sent")}>
            Lời mời đã gửi <span>{sentRequests.length}</span>
          </button>
          <button className={friendModalTab === "search" ? "active" : ""} onClick={() => setFriendModalTab("search")}>
            <Icon name="users" size={13} /> Tìm & Kết bạn mới
          </button>
        </div>

        <div className="chat-friends-body">
          {friendModalTab === "friends" && <>
            {filteredDirectory.filter(u => friends.includes(u.name)).map(u => <div className="chat-friend-item" key={u.name}>
              <div className="conv-avatar"><img src={u.img} alt={u.name} /><i style={{ background: u.online ? "#36d092" : "#625b6b" }} /></div>
              <div>
                <b>{u.name} <span style={{ color: "#6ed3ad", fontSize: "8px", fontWeight: 500 }}>· {u.online ? "Đang online" : "Offline"}</span></b>
                <small>{u.user}</small>
                <p>{u.bio}</p>
              </div>
              <div className="chat-friend-actions">
                <Button icon="message" onClick={() => startDirectChatWith(u.name, u.img)}>Nhắn tin</Button>
                <Button variant="ghost" onClick={() => removeFriend(u.name)}>Hủy kết bạn</Button>
              </div>
            </div>)}
            {filteredDirectory.filter(u => friends.includes(u.name)).length === 0 && <div className="empty-results" style={{ height: "160px" }}><b>Không tìm thấy bạn bè phù hợp</b><p>Hãy thử từ khóa khác hoặc chuyển sang tab Tìm & Kết bạn mới.</p></div>}
          </>}

          {friendModalTab === "received" && <>
            {filteredDirectory.filter(u => receivedRequests.includes(u.name)).map(u => <div className="chat-friend-item" key={u.name}>
              <div className="conv-avatar"><img src={u.img} alt={u.name} /><i style={{ background: u.online ? "#36d092" : "#625b6b" }} /></div>
              <div>
                <b>{u.name}</b>
                <small>{u.user} · Gửi lời mời 2 giờ trước</small>
                <p>{u.bio}</p>
              </div>
              <div className="chat-friend-actions">
                <Button icon="check" onClick={() => acceptRequest(u.name)}>Chấp nhận</Button>
                <Button variant="ghost" onClick={() => rejectRequest(u.name)}>Từ chối</Button>
              </div>
            </div>)}
            {filteredDirectory.filter(u => receivedRequests.includes(u.name)).length === 0 && <div className="empty-results" style={{ height: "160px" }}><b>Không có lời mời kết bạn nào đang chờ</b><p>Khi có người gửi lời mời kết bạn, danh sách sẽ hiển thị tại đây.</p></div>}
          </>}

          {friendModalTab === "sent" && <>
            {filteredDirectory.filter(u => sentRequests.includes(u.name)).map(u => <div className="chat-friend-item" key={u.name}>
              <div className="conv-avatar"><img src={u.img} alt={u.name} /><i style={{ background: u.online ? "#36d092" : "#625b6b" }} /></div>
              <div>
                <b>{u.name}</b>
                <small>{u.user} · Đang chờ phản hồi</small>
                <p>{u.bio}</p>
              </div>
              <div className="chat-friend-actions">
                <Button variant="secondary" onClick={() => startDirectChatWith(u.name, u.img)}>Nhắn tin</Button>
                <Button variant="danger" onClick={() => cancelSentRequest(u.name)}>Thu hồi lời mời</Button>
              </div>
            </div>)}
            {filteredDirectory.filter(u => sentRequests.includes(u.name)).length === 0 && <div className="empty-results" style={{ height: "160px" }}><b>Chưa có lời mời đã gửi nào</b><p>Bạn có thể tìm và gửi lời mời kết bạn ở tab Tìm & Kết bạn mới.</p></div>}
          </>}

          {friendModalTab === "search" && <>
            {filteredDirectory.map(u => {
              const isFriend = friends.includes(u.name);
              const isReceived = receivedRequests.includes(u.name);
              const isSent = sentRequests.includes(u.name);
              return <div className="chat-friend-item" key={u.name}>
                <div className="conv-avatar"><img src={u.img} alt={u.name} /><i style={{ background: u.online ? "#36d092" : "#625b6b" }} /></div>
                <div>
                  <b>{u.name}</b>
                  <small>{u.user} · {u.online ? "Đang hoạt động" : "Offline"}</small>
                  <p>{u.bio}</p>
                </div>
                <div className="chat-friend-actions">
                  <Button variant="secondary" icon="message" onClick={() => startDirectChatWith(u.name, u.img)}>Nhắn tin</Button>
                  {isFriend ? (
                    <Button variant="ghost" icon="check">Đã là bạn bè</Button>
                  ) : isReceived ? (
                    <Button onClick={() => acceptRequest(u.name)}>Chấp nhận lời mời</Button>
                  ) : isSent ? (
                    <Button variant="ghost" onClick={() => cancelSentRequest(u.name)}>Đã gửi · Hủy</Button>
                  ) : (
                    <Button icon="users" onClick={() => sendFriendRequest(u.name)}>Kết bạn</Button>
                  )}
                </div>
              </div>;
            })}
          </>}
        </div>

        <div className="modal-actions" style={{ marginTop: "12px", paddingTop: "12px" }}>
          <Button variant="ghost" onClick={() => { setShowFriendsModal(false); setPage("friends"); }}>Mở trang Bạn bè toàn màn hình</Button>
          <Button onClick={() => setShowFriendsModal(false)}>Đóng</Button>
        </div>
      </div>
    </div>}

    {/* MODAL TẠO NHÓM CHAT MỚI */}
    {showCreateGroup && <div className="modal-backdrop" onMouseDown={() => setShowCreateGroup(false)}>
      <div className="admin-modal-wide" style={{ width: "480px" }} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head"><div><span>NHẮN TIN NHÓM</span><h2>Tạo Nhóm Trò Chuyện Mới</h2><p>Đặt tên nhóm và chọn bạn bè để bắt đầu thảo luận truyện, phim.</p></div><button className="icon-btn" onClick={() => setShowCreateGroup(false)}><Icon name="x" /></button></div>
        <label className="admin-field"><span>Tên nhóm chat *</span><input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="VD: Hội bàn luận One Piece & Sci-Fi..." /></label>
        <div className="admin-field">
          <span>Chọn thành viên thêm vào nhóm ({newGroupMembers.length} đã chọn)</span>
          <div className="admin-genre-picks" style={{ marginTop: "8px" }}>
            {allDirectoryUsers.map(u => <button
              key={u.name}
              type="button"
              className={newGroupMembers.includes(u.name) ? "active" : ""}
              onClick={() => setNewGroupMembers(newGroupMembers.includes(u.name) ? newGroupMembers.filter(x => x !== u.name) : [...newGroupMembers, u.name])}
            >{u.name} ({u.user})</button>)}
          </div>
        </div>
        <div className="modal-actions"><div /><div><Button variant="ghost" onClick={() => setShowCreateGroup(false)}>Hủy</Button><Button icon="plus" onClick={createNewGroupChat}>Tạo nhóm ngay</Button></div></div>
      </div>
    </div>}
  </main>;
}

type AdminUserItem = { id: number; name: string; username: string; email: string; avatar: string; bio: string; role: "USER" | "ADMIN"; status: "ACTIVE" | "LOCKED" | "BANNED"; joinedAt: string };
type AdminChapterItem = { id: number; season: string; number: string; title: string; url: string; note: string };
type AdminContentItem = { id: number; title: string; sub: string; img: string; status: string; score: string; type: "Truyện" | "Phim"; isSeries: boolean; visibility: "PUBLIC" | "SHARED" | "PRIVATE"; description: string; mainLink: string; genres: string[]; chapters: AdminChapterItem[] };

function AdminPage({ setPage, contents, setContents }: { setPage: (page: string) => void; contents: ContentItem[]; setContents: (items: ContentItem[]) => void }) {
  const [tab, setTab] = useState<"users" | "contents" | "Taxonomy" | "reports">("users");
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); window.setTimeout(() => setToast(""), 3500); };

  // 1. STATE QUẢN LÝ NGƯỜI DÙNG
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("ALL");
  const [userStatusFilter, setUserStatusFilter] = useState("ALL");
  const [users, setUsers] = useState<AdminUserItem[]>([
    { id: 1, name: "Nguyễn Huy", username: "@huynguyen", email: "huy.nguyen@example.com", avatar: photos.red, bio: "Quản trị viên hệ thống Mê Truyện.", role: "ADMIN", status: "ACTIVE", joinedAt: "18/08/2023" },
    { id: 2, name: "Lan Anh", username: "@lananh", email: "lananh@example.com", avatar: photos.rain, bio: "Mê anime chữa lành và phim Nhật.", role: "USER", status: "ACTIVE", joinedAt: "02/11/2023" },
    { id: 3, name: "Minh Trần", username: "@minhtran", email: "minhtran@example.com", avatar: photos.city, bio: "Đọc shounen, xem sci-fi mỗi tối.", role: "USER", status: "LOCKED", joinedAt: "14/01/2024" },
    { id: 4, name: "Tuấn Minh", username: "@tuanminh", email: "tuanminh@example.com", avatar: photos.street, bio: "Review phim và manga trinh thám.", role: "USER", status: "ACTIVE", joinedAt: "25/03/2024" },
    { id: 5, name: "Thu Hà", username: "@hanguyen", email: "thuha@example.com", avatar: photos.lantern, bio: "Một chiếc mọt truyện chính hiệu.", role: "USER", status: "BANNED", joinedAt: "09/06/2024" },
  ]);
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: "", username: "", email: "", role: "USER" as "USER" | "ADMIN", status: "ACTIVE" as "ACTIVE" | "LOCKED" | "BANNED", bio: "" });

  // 2. STATE QUẢN LÝ TRUYỆN / PHIM & CHƯƠNG / TẬP
  const [contentSearch, setContentSearch] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("ALL");
  const [contentStatusFilter, setContentStatusFilter] = useState("ALL");
  const [adminContents, setAdminContents] = useState<AdminContentItem[]>(() =>
    contents.map((c, idx) => ({
      id: idx + 1,
      title: c.title,
      sub: c.sub,
      img: c.img,
      status: c.status,
      score: c.score,
      type: c.type,
      isSeries: true,
      visibility: "PUBLIC",
      description: `Mô tả chi tiết chính thức cho tác phẩm “${c.title}” (${c.sub}). Nội dung được kiểm duyệt và cập nhật bởi Quản trị viên hệ thống.`,
      mainLink: c.type === "Truyện" ? "https://mangadex.org" : "https://www.netflix.com",
      genres: c.genres,
      chapters: [
        { id: 1, season: "Mùa 1", number: "1", title: "Khởi đầu hành trình", url: "https://mangadex.org/chapter/1", note: "Bản dịch chuẩn" },
        { id: 2, season: "Mùa 1", number: "2", title: "Bí mật trong đêm", url: "https://mangadex.org/chapter/2", note: "Đã cập nhật link mới" },
        { id: 3, season: "Mùa 1", number: "3.5", title: "Ngoại truyện đặc biệt", url: "https://mangadex.org/chapter/3-5", note: "" },
      ],
    }))
  );
  const [editingContent, setEditingContent] = useState<AdminContentItem | null>(null);
  const [managingChaptersFor, setManagingChaptersFor] = useState<AdminContentItem | null>(null);

  // 3. STATE QUẢN LÝ THỂ LOẠI & DANH MỤC HỆ THỐNG
  const [genreList, setGenreList] = useState([
    { id: 1, name: "Action", slug: "hanh-dong", desc: "Hành động, chiến đấu kịch tính" },
    { id: 2, name: "Mystery", slug: "bi-an-trinh-tham", desc: "Điều tra phá án, suy luận logic" },
    { id: 3, name: "Sci-Fi", slug: "khoa-hoc-vien-tuong", desc: "Công nghệ tương lai, cyberpunk" },
    { id: 4, name: "Romance", slug: "tinh-cam", desc: "Lãng mạn, cảm xúc gia đình & tình yêu" },
    { id: 5, name: "Horror", slug: "kinh-di", desc: "Rùng rợn, tâm lý, bí ẩn" },
    { id: 6, name: "Fantasy", slug: "gia-tuong", desc: "Thế giới phép thuật, dị giới" },
  ]);
  const [newGenre, setNewGenre] = useState({ name: "", slug: "", desc: "" });
  const [sysCategories, setSysCategories] = useState([
    { id: 1, name: "Yêu thích", desc: "Những bộ truyện, phim tâm đắc nhất" },
    { id: 2, name: "Đang đọc / Đang xem", desc: "Nội dung đang theo dõi dở" },
    { id: 3, name: "Muốn đọc / Muốn xem", desc: "Danh sách dự định sẽ đọc hoặc xem" },
    { id: 4, name: "Đã hoàn thành", desc: "Những bộ đã đọc hoặc xem trọn vẹn" },
  ]);
  const [newCategory, setNewCategory] = useState({ name: "", desc: "" });

  // 4. STATE BÁO CÁO VI PHẠM & BÌNH LUẬN
  const [reports, setReports] = useState([
    { id: 101, reporter: "@lananh", targetType: "REVIEW", targetName: "Bình luận chương 8 - Nightfall City", reason: "Tiết lộ nội dung (Spoiler) không gắn cảnh báo", status: "PENDING", adminNote: "" },
    { id: 102, reporter: "@tuanminh", targetType: "CONTENT", targetName: "Ánh Sáng Cuối Hè", reason: "Đường dẫn xem phim bên ngoài bị hỏng", status: "PENDING", adminNote: "" },
    { id: 103, reporter: "@hanguyen", targetType: "MESSAGE", targetName: "Tin nhắn nhóm Hội mê manga", reason: "Spam đường dẫn quảng cáo", status: "RESOLVED", adminNote: "Đã xóa tin nhắn và nhắc nhở thành viên." },
  ]);

  // Đồng bộ thay đổi kho truyện/phim của Admin ra toàn hệ thống
  const syncGlobalContents = (updatedList: AdminContentItem[]) => {
    setAdminContents(updatedList);
    setContents(updatedList.map(item => ({
      title: item.title,
      sub: item.sub,
      img: item.img,
      status: item.status,
      score: item.score,
      type: item.type,
      genres: item.genres,
    })));
  };

  // Bộ lọc người dùng
  const filteredUsers = users.filter(u =>
    (`${u.name} ${u.username} ${u.email}`.toLowerCase().includes(userSearch.toLowerCase())) &&
    (userRoleFilter === "ALL" || u.role === userRoleFilter) &&
    (userStatusFilter === "ALL" || u.status === userStatusFilter)
  );

  // Bộ lọc truyện/phim
  const filteredContents = adminContents.filter(c =>
    (`${c.title} ${c.sub}`.toLowerCase().includes(contentSearch.toLowerCase())) &&
    (contentTypeFilter === "ALL" || c.type === contentTypeFilter) &&
    (contentStatusFilter === "ALL" || c.status === contentStatusFilter)
  );

  const saveEditedUser = () => {
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    showToast(`Đã cập nhật thông tin và phân quyền cho tài khoản ${editingUser.username}.`);
    setEditingUser(null);
  };

  const createNewUser = () => {
    if (!newUserForm.name.trim() || !newUserForm.email.trim()) return;
    const created: AdminUserItem = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: newUserForm.name.trim(),
      username: newUserForm.username.trim().startsWith("@") ? newUserForm.username.trim() : `@${newUserForm.username.trim() || "user"}`,
      email: newUserForm.email.trim(),
      avatar: photos.red,
      bio: newUserForm.bio || "Thành viên mới của hệ thống.",
      role: newUserForm.role,
      status: newUserForm.status,
      joinedAt: "Hôm nay",
    };
    setUsers([created, ...users]);
    setCreatingUser(false);
    setNewUserForm({ name: "", username: "", email: "", role: "USER", status: "ACTIVE", bio: "" });
    showToast(`Đã tạo tài khoản ${created.username} thành công.`);
  };

  const deleteUser = (id: number, username: string) => {
    setUsers(users.filter(u => u.id !== id));
    showToast(`Đã xóa tài khoản ${username} khỏi hệ thống.`);
  };

  const saveEditedContent = () => {
    if (!editingContent || !editingContent.title.trim()) return;
    const exists = adminContents.some(c => c.id === editingContent.id);
    const updated = exists
      ? adminContents.map(c => c.id === editingContent.id ? editingContent : c)
      : [editingContent, ...adminContents];
    syncGlobalContents(updated);
    showToast(`Đã lưu cập nhật cho tác phẩm “${editingContent.title}”.`);
    setEditingContent(null);
  };

  const deleteContent = (id: number, title: string) => {
    const updated = adminContents.filter(c => c.id !== id);
    syncGlobalContents(updated);
    showToast(`Đã xóa tác phẩm “${title}” khỏi hệ thống.`);
  };

  const saveChaptersModal = () => {
    if (!managingChaptersFor) return;
    const updated = adminContents.map(c => c.id === managingChaptersFor.id ? managingChaptersFor : c);
    syncGlobalContents(updated);
    showToast(`Đã cập nhật danh sách chương/tập cho “${managingChaptersFor.title}”.`);
    setManagingChaptersFor(null);
  };

  return <main className="inner-page admin-page"><div className="page-shell">
    <PageHeading
      eyebrow="QUẢN TRỊ HỆ THỐNG TOÀN QUYỀN (ROLE_ADMIN)"
      title="Bảng Điều Khiển Quản Trị"
      description="Quản lý tài khoản người dùng, thêm/sửa/xóa truyện & phim, cập nhật chương/tập, quản lý thể loại và xử lý báo cáo vi phạm."
      action={<div style={{ display: "flex", gap: "8px" }}>
        <Button variant="secondary" icon="users" onClick={() => setCreatingUser(true)}>+ Tạo tài khoản</Button>
        <Button icon="plus" onClick={() => setEditingContent({
          id: Date.now(),
          title: "",
          sub: "Đạo diễn / Tác giả",
          img: photos.hero,
          status: "Đang ra",
          score: "4.8",
          type: "Truyện",
          isSeries: true,
          visibility: "PUBLIC",
          description: "",
          mainLink: "https://",
          genres: ["Action"],
          chapters: [{ id: 1, season: "Mùa 1", number: "1", title: "Chương mở đầu", url: "https://", note: "" }],
        })}>+ Thêm Truyện / Phim</Button>
      </div>}
    />

    {toast && <div className="success-banner"><Icon name="check" /> {toast}<button onClick={() => setToast("")}>×</button></div>}

    <div className="admin-stats">
      <button className={`admin-stat-card ${tab === "users" ? "active" : ""}`} onClick={() => setTab("users")}>
        <div><span>QUẢN LÝ NGƯỜI DÙNG</span><b>{users.length}</b><small>{users.filter(u => u.status === "ACTIVE").length} đang hoạt động · {users.filter(u => u.role === "ADMIN").length} Admin</small></div>
        <div className="option-icon"><Icon name="users" /></div>
      </button>
      <button className={`admin-stat-card ${tab === "contents" ? "active" : ""}`} onClick={() => setTab("contents")}>
        <div><span>KHO TRUYỆN & PHIM</span><b>{adminContents.length}</b><small>{adminContents.filter(c => c.type === "Truyện").length} Truyện · {adminContents.filter(c => c.type === "Phim").length} Phim</small></div>
        <div className="option-icon"><Icon name="book" /></div>
      </button>
      <button className={`admin-stat-card ${tab === "Taxonomy" ? "active" : ""}`} onClick={() => setTab("Taxonomy")}>
        <div><span>THỂ LOẠI & DANH MỤC</span><b>{genreList.length + sysCategories.length}</b><small>{genreList.length} Thể loại · {sysCategories.length} Danh mục</small></div>
        <div className="option-icon"><Icon name="grid" /></div>
      </button>
      <button className={`admin-stat-card ${tab === "reports" ? "active" : ""}`} onClick={() => setTab("reports")}>
        <div><span>BÁO CÁO VI PHẠM</span><b>{reports.filter(r => r.status === "PENDING").length}</b><small className="warn">{reports.filter(r => r.status === "PENDING").length} báo cáo chờ xử lý</small></div>
        <div className="option-icon"><Icon name="flag" /></div>
      </button>
    </div>

    <div className="admin-tabs">
      <button className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}><Icon name="users" size={14} /> Quản lý Người dùng ({users.length})</button>
      <button className={tab === "contents" ? "active" : ""} onClick={() => setTab("contents")}><Icon name="book" size={14} /> Quản lý Truyện & Phim ({adminContents.length})</button>
      <button className={tab === "Taxonomy" ? "active" : ""} onClick={() => setTab("Taxonomy")}><Icon name="grid" size={14} /> Quản lý Thể loại & Danh mục ({genreList.length})</button>
      <button className={tab === "reports" ? "active" : ""} onClick={() => setTab("reports")}><Icon name="flag" size={14} /> Kiểm duyệt & Báo cáo ({reports.filter(r => r.status === "PENDING").length})</button>
    </div>

    {/* TAB 1: QUẢN LÝ NGƯỜI DÙNG */}
    {tab === "users" && <div className="admin-table-card">
      <div className="admin-table-head">
        <h3>Danh sách tài khoản người dùng ({filteredUsers.length})</h3>
        <div className="admin-toolbar">
          <label className="admin-search"><Icon name="search" size={15} /><input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Tìm tên, @username, email..." /></label>
          <select className="admin-select" value={userRoleFilter} onChange={e => setUserRoleFilter(e.target.value)}>
            <option value="ALL">Tất cả vai trò</option>
            <option value="ADMIN">Quản trị viên (ADMIN)</option>
            <option value="USER">Người dùng (USER)</option>
          </select>
          <select className="admin-select" value={userStatusFilter} onChange={e => setUserStatusFilter(e.target.value)}>
            <option value="ALL">Tất cả trạng thái</option>
            <option value="ACTIVE">Đang hoạt động (ACTIVE)</option>
            <option value="LOCKED">Tạm khóa (LOCKED)</option>
            <option value="BANNED">Cấm vĩnh viễn (BANNED)</option>
          </select>
        </div>
      </div>
      <table className="admin-table">
        <thead><tr><th>ID</th><th>THÀNH VIÊN</th><th>EMAIL / NGÀY THAM GIA</th><th>VAI TRÒ</th><th>TRẠNG THÁI</th><th>THAO TÁC QUẢN TRỊ</th></tr></thead>
        <tbody>{filteredUsers.map(u => <tr key={u.id}>
          <td>#{u.id}</td>
          <td>
            <div className="admin-user-cell">
              <img src={u.avatar} alt={u.name} />
              <div><b>{u.name}</b> <span style={{ color: "#9c70f8" }}>{u.username}</span><br /><small style={{ color: "#756b80", fontSize: "8px" }}>{u.bio}</small></div>
            </div>
          </td>
          <td>{u.email}<br /><small style={{ color: "#6d6479", fontSize: "8px" }}>Tham gia: {u.joinedAt}</small></td>
          <td><span className={`badge-pill ${u.role === "ADMIN" ? "role-admin" : ""}`}>{u.role}</span></td>
          <td><span className={`badge-pill ${u.status === "ACTIVE" ? "active" : u.status === "LOCKED" ? "locked" : "banned"}`}>{u.status}</span></td>
          <td><div className="admin-row-actions">
            <Button variant="secondary" icon="edit" onClick={() => setEditingUser({ ...u })}>Chỉnh sửa</Button>
            <Button variant="ghost" onClick={() => {
              const nextRole = u.role === "ADMIN" ? "USER" : "ADMIN";
              setUsers(users.map(item => item.id === u.id ? { ...item, role: nextRole } : item));
              showToast(`Đã đổi vai trò của ${u.username} sang ${nextRole}.`);
            }}>Đổi Role</Button>
            <Button variant={u.status === "ACTIVE" ? "danger" : "secondary"} onClick={() => {
              const nextStatus = u.status === "ACTIVE" ? "LOCKED" : "ACTIVE";
              setUsers(users.map(item => item.id === u.id ? { ...item, status: nextStatus } : item));
              showToast(`Đã cập nhật trạng thái ${u.username} thành ${nextStatus}.`);
            }}>{u.status === "ACTIVE" ? "Khóa" : "Mở khóa"}</Button>
            <Button variant="danger" onClick={() => deleteUser(u.id, u.username)}>Xóa</Button>
          </div></td>
        </tr>)}</tbody>
      </table>
    </div>}

    {/* TAB 2: QUẢN LÝ TRUYỆN & PHIM */}
    {tab === "contents" && <div className="admin-table-card">
      <div className="admin-table-head">
        <h3>Kho dữ liệu Truyện & Phim toàn hệ thống ({filteredContents.length})</h3>
        <div className="admin-toolbar">
          <label className="admin-search"><Icon name="search" size={15} /><input value={contentSearch} onChange={e => setContentSearch(e.target.value)} placeholder="Tìm tên truyện, phim, tác giả..." /></label>
          <select className="admin-select" value={contentTypeFilter} onChange={e => setContentTypeFilter(e.target.value)}>
            <option value="ALL">Tất cả loại</option>
            <option value="Truyện">Truyện (MANGA)</option>
            <option value="Phim">Phim (MOVIE)</option>
          </select>
          <select className="admin-select" value={contentStatusFilter} onChange={e => setContentStatusFilter(e.target.value)}>
            <option value="ALL">Mọi trạng thái</option>
            <option value="Đang ra">Đang cập nhật</option>
            <option value="Hoàn thành">Đã hoàn thành</option>
            <option value="Drop">Tạm ngưng (Hiatus/Drop)</option>
          </select>
        </div>
      </div>
      <table className="admin-table">
        <thead><tr><th>TÁC PHẨM</th><th>PHÂN LOẠI</th><th>THỂ LOẠI</th><th>CHƯƠNG / TẬP</th><th>TRẠNG THÁI</th><th>HIỂN THỊ</th><th>THAO TÁC CHỈNH SỬA & CẬP NHẬT</th></tr></thead>
        <tbody>{filteredContents.map(item => <tr key={item.id}>
          <td>
            <div className="admin-content-cell">
              <img src={item.img} alt={item.title} />
              <div>
                <b>{item.title}</b><br />
                <small style={{ color: "#8c8299", fontSize: "8px" }}>{item.sub}</small><br />
                <span style={{ color: "#f9c84c", fontSize: "8px" }}>★ {item.score} / 5</span>
              </div>
            </div>
          </td>
          <td><span className={`badge-pill ${item.type === "Truyện" ? "type-manga" : "type-movie"}`}>{item.type === "Truyện" ? "MANGA" : "MOVIE"}</span></td>
          <td><div style={{ maxWidth: "180px", fontSize: "9px", color: "#b6acc4" }}>{item.genres.join(", ")}</div></td>
          <td><b>{item.chapters.length}</b> {item.type === "Truyện" ? "chương" : "tập"}</td>
          <td><span className={`badge-pill ${item.status === "Hoàn thành" ? "active" : item.status === "Drop" ? "locked" : "role-admin"}`}>{item.status}</span></td>
          <td><span className="badge-pill active">{item.visibility}</span></td>
          <td><div className="admin-row-actions">
            <Button variant="secondary" icon="edit" onClick={() => setEditingContent({ ...item })}>Chỉnh sửa</Button>
            <Button variant="secondary" icon="plus" onClick={() => setManagingChaptersFor({ ...item, chapters: [...item.chapters] })}>Cập nhật Chương/Tập</Button>
            <Button variant="ghost" onClick={() => setPage("detail")}>Xem trang</Button>
            <Button variant="danger" onClick={() => deleteContent(item.id, item.title)}>Xóa</Button>
          </div></td>
        </tr>)}</tbody>
      </table>
    </div>}

    {/* TAB 3: QUẢN LÝ THỂ LOẠI & DANH MỤC */}
    {tab === "Taxonomy" && <div className="admin-split-grid">
      <div className="admin-table-card">
        <div className="admin-table-head"><h3>Quản lý Thể loại ({genreList.length})</h3></div>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #272030", display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr auto", gap: "8px" }}>
          <input className="admin-select" value={newGenre.name} onChange={e => setNewGenre({ ...newGenre, name: e.target.value })} placeholder="Tên thể loại (VD: Isekai)" />
          <input className="admin-select" value={newGenre.slug} onChange={e => setNewGenre({ ...newGenre, slug: e.target.value })} placeholder="Slug (VD: di-gioi)" />
          <input className="admin-select" value={newGenre.desc} onChange={e => setNewGenre({ ...newGenre, desc: e.target.value })} placeholder="Mô tả ngắn..." />
          <Button icon="plus" onClick={() => {
            if (!newGenre.name.trim()) return;
            setGenreList([{ id: Date.now(), name: newGenre.name.trim(), slug: newGenre.slug.trim() || newGenre.name.toLowerCase(), desc: newGenre.desc.trim() }, ...genreList]);
            setNewGenre({ name: "", slug: "", desc: "" });
            showToast(`Đã thêm thể loại “${newGenre.name}”.`);
          }}>Thêm</Button>
        </div>
        <table className="admin-table">
          <thead><tr><th>TÊN THỂ LOẠI</th><th>SLUG</th><th>MÔ TẢ</th><th>XÓA</th></tr></thead>
          <tbody>{genreList.map(g => <tr key={g.id}>
            <td><b>{g.name}</b></td>
            <td><code>{g.slug}</code></td>
            <td>{g.desc}</td>
            <td><Button variant="danger" onClick={() => { setGenreList(genreList.filter(x => x.id !== g.id)); showToast(`Đã xóa thể loại ${g.name}.`); }}>Xóa</Button></td>
          </tr>)}</tbody>
        </table>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-head"><h3>Danh mục mặc định hệ thống ({sysCategories.length})</h3></div>
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #272030", display: "grid", gridTemplateColumns: "1fr 1.4fr auto", gap: "8px" }}>
          <input className="admin-select" value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} placeholder="Tên danh mục..." />
          <input className="admin-select" value={newCategory.desc} onChange={e => setNewCategory({ ...newCategory, desc: e.target.value })} placeholder="Mô tả danh mục..." />
          <Button icon="plus" onClick={() => {
            if (!newCategory.name.trim()) return;
            setSysCategories([...sysCategories, { id: Date.now(), name: newCategory.name.trim(), desc: newCategory.desc.trim() }]);
            setNewCategory({ name: "", desc: "" });
            showToast(`Đã thêm danh mục hệ thống “${newCategory.name}”.`);
          }}>Thêm</Button>
        </div>
        <table className="admin-table">
          <thead><tr><th>TÊN DANH MỤC</th><th>MÔ TẢ</th><th>THAO TÁC</th></tr></thead>
          <tbody>{sysCategories.map(c => <tr key={c.id}>
            <td><b>{c.name}</b></td>
            <td>{c.desc}</td>
            <td><Button variant="danger" onClick={() => setSysCategories(sysCategories.filter(x => x.id !== c.id))}>Xóa</Button></td>
          </tr>)}</tbody>
        </table>
      </div>
    </div>}

    {/* TAB 4: BÁO CÁO VI PHẠM */}
    {tab === "reports" && <div className="admin-table-card">
      <div className="admin-table-head"><h3>Báo cáo nội dung & bình luận vi phạm ({reports.length})</h3></div>
      <table className="admin-table">
        <thead><tr><th>MÃ</th><th>NGƯỜI BÁO CÁO</th><th>LOẠI</th><th>ĐỐI TƯỢNG VI PHẠM</th><th>LÝ DO BÁO CÁO</th><th>TRẠNG THÁI</th><th>XỬ LÝ VI PHẠM</th></tr></thead>
        <tbody>{reports.map(r => <tr key={r.id}>
          <td>#{r.id}</td>
          <td><b>{r.reporter}</b></td>
          <td><span className="badge-pill role-admin">{r.targetType}</span></td>
          <td><b>{r.targetName}</b></td>
          <td>{r.reason}</td>
          <td><span className={`badge-pill ${r.status === "PENDING" ? "pending" : r.status === "RESOLVED" ? "active" : "locked"}`}>{r.status}</span></td>
          <td><div className="admin-row-actions">
            {r.status === "PENDING" ? <>
              <Button onClick={() => { setReports(reports.map(x => x.id === r.id ? { ...x, status: "RESOLVED" } : x)); showToast(`Đã xử lý báo cáo #${r.id}.`); }}>Xử lý & Ẩn vi phạm</Button>
              <Button variant="ghost" onClick={() => { setReports(reports.map(x => x.id === r.id ? { ...x, status: "REJECTED" } : x)); showToast(`Đã bỏ qua báo cáo #${r.id}.`); }}>Từ chối</Button>
            </> : <span style={{ color: "#6ed3ad", fontSize: "9px" }}>✓ Đã xử lý</span>}
          </div></td>
        </tr>)}</tbody>
      </table>
    </div>}

    {/* MODAL 1: CHỈNH SỬA NGƯỜI DÙNG */}
    {editingUser && <div className="modal-backdrop" onMouseDown={() => setEditingUser(null)}>
      <div className="admin-modal-wide" style={{ width: "520px" }} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head"><div><span>QUẢN LÝ TÀI KHOẢN</span><h2>Chỉnh sửa Người dùng #{editingUser.id}</h2><p>Cập nhật thông tin hồ sơ, vai trò và trạng thái hoạt động.</p></div><button className="icon-btn" onClick={() => setEditingUser(null)}><Icon name="x" /></button></div>
        <div className="admin-field-two">
          <label className="admin-field"><span>Tên hiển thị</span><input value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} /></label>
          <label className="admin-field"><span>Username</span><input value={editingUser.username} onChange={e => setEditingUser({ ...editingUser, username: e.target.value })} /></label>
        </div>
        <label className="admin-field"><span>Địa chỉ Email</span><input value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} /></label>
        <div className="admin-field-two">
          <label className="admin-field"><span>Vai trò hệ thống (Role)</span>
            <select value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value as "USER" | "ADMIN" })}>
              <option value="USER">USER — Người dùng chuẩn</option>
              <option value="ADMIN">ADMIN — Quản trị viên</option>
            </select>
          </label>
          <label className="admin-field"><span>Trạng thái tài khoản</span>
            <select value={editingUser.status} onChange={e => setEditingUser({ ...editingUser, status: e.target.value as "ACTIVE" | "LOCKED" | "BANNED" })}>
              <option value="ACTIVE">ACTIVE — Đang hoạt động</option>
              <option value="LOCKED">LOCKED — Tạm khóa</option>
              <option value="BANNED">BANNED — Cấm vĩnh viễn</option>
            </select>
          </label>
        </div>
        <label className="admin-field"><span>Giới thiệu (Bio)</span><textarea value={editingUser.bio} onChange={e => setEditingUser({ ...editingUser, bio: e.target.value })} /></label>
        <div className="modal-actions">
          <Button variant="danger" onClick={() => { deleteUser(editingUser.id, editingUser.username); setEditingUser(null); }}>Xóa tài khoản</Button>
          <div><Button variant="ghost" onClick={() => setEditingUser(null)}>Hủy</Button><Button icon="check" onClick={saveEditedUser}>Lưu cập nhật</Button></div>
        </div>
      </div>
    </div>}

    {/* MODAL 2: TẠO TÀI KHOẢN MỚI */}
    {creatingUser && <div className="modal-backdrop" onMouseDown={() => setCreatingUser(false)}>
      <div className="admin-modal-wide" style={{ width: "520px" }} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head"><div><span>THÊM THÀNH VIÊN</span><h2>Tạo Tài khoản Mới</h2><p>Khởi tạo nhanh tài khoản người dùng hoặc quản trị viên mới.</p></div><button className="icon-btn" onClick={() => setCreatingUser(false)}><Icon name="x" /></button></div>
        <div className="admin-field-two">
          <label className="admin-field"><span>Tên hiển thị *</span><input value={newUserForm.name} onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })} placeholder="Nguyễn Văn A" /></label>
          <label className="admin-field"><span>Username *</span><input value={newUserForm.username} onChange={e => setNewUserForm({ ...newUserForm, username: e.target.value })} placeholder="@nguyenvana" /></label>
        </div>
        <label className="admin-field"><span>Email *</span><input value={newUserForm.email} onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })} placeholder="email@example.com" /></label>
        <div className="admin-field-two">
          <label className="admin-field"><span>Phân quyền</span>
            <select value={newUserForm.role} onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value as "USER" | "ADMIN" })}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </label>
          <label className="admin-field"><span>Trạng thái</span>
            <select value={newUserForm.status} onChange={e => setNewUserForm({ ...newUserForm, status: e.target.value as "ACTIVE" | "LOCKED" | "BANNED" })}>
              <option value="ACTIVE">ACTIVE</option>
              <option value="LOCKED">LOCKED</option>
            </select>
          </label>
        </div>
        <label className="admin-field"><span>Giới thiệu</span><textarea value={newUserForm.bio} onChange={e => setNewUserForm({ ...newUserForm, bio: e.target.value })} placeholder="Thông tin giới thiệu..." /></label>
        <div className="modal-actions"><div /><div><Button variant="ghost" onClick={() => setCreatingUser(false)}>Hủy</Button><Button icon="plus" onClick={createNewUser}>Tạo tài khoản</Button></div></div>
      </div>
    </div>}

    {/* MODAL 3: CHỈNH SỬA / CẬP NHẬT TRUYỆN & PHIM */}
    {editingContent && <div className="modal-backdrop" onMouseDown={() => setEditingContent(null)}>
      <div className="admin-modal-wide" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head">
          <div><span>QUẢN LÝ NỘI DUNG</span><h2>Chỉnh sửa & Cập nhật Truyện / Phim</h2><p>Chỉnh sửa thông tin gốc, mô tả chi tiết, thể loại, trạng thái và đường dẫn của tác phẩm.</p></div>
          <button className="icon-btn" onClick={() => setEditingContent(null)}><Icon name="x" /></button>
        </div>
        <div className="admin-form-grid">
          <div className="admin-poster-preview"><img src={editingContent.img || photos.hero} alt={editingContent.title} /></div>
          <div>
            <div className="admin-field-two">
              <label className="admin-field"><span>Tên Truyện / Phim *</span><input value={editingContent.title} onChange={e => setEditingContent({ ...editingContent, title: e.target.value })} placeholder="Nhập tên tác phẩm..." /></label>
              <label className="admin-field"><span>Tác giả / Đạo diễn / Năm</span><input value={editingContent.sub} onChange={e => setEditingContent({ ...editingContent, sub: e.target.value })} placeholder="VD: S. Kuroda hoặc Movie · 2025" /></label>
            </div>
            <div className="admin-field-row">
              <label className="admin-field"><span>Loại nội dung</span>
                <select value={editingContent.type} onChange={e => setEditingContent({ ...editingContent, type: e.target.value as "Truyện" | "Phim" })}>
                  <option value="Truyện">Truyện (MANGA)</option>
                  <option value="Phim">Phim (MOVIE)</option>
                </select>
              </label>
              <label className="admin-field"><span>Trạng thái phát hành</span>
                <select value={editingContent.status} onChange={e => setEditingContent({ ...editingContent, status: e.target.value })}>
                  <option value="Đang ra">Đang cập nhật (ONGOING)</option>
                  <option value="Hoàn thành">Đã hoàn thành (COMPLETED)</option>
                  <option value="Drop">Tạm ngưng (HIATUS)</option>
                </select>
              </label>
              <label className="admin-field"><span>Quyền hiển thị</span>
                <select value={editingContent.visibility} onChange={e => setEditingContent({ ...editingContent, visibility: e.target.value as "PUBLIC" | "SHARED" | "PRIVATE" })}>
                  <option value="PUBLIC">Công khai (PUBLIC)</option>
                  <option value="SHARED">Chia sẻ cộng đồng (SHARED)</option>
                  <option value="PRIVATE">Riêng tư (PRIVATE)</option>
                </select>
              </label>
            </div>
            <div className="admin-field-two">
              <label className="admin-field"><span>URL Ảnh bìa / Poster</span><input value={editingContent.img} onChange={e => setEditingContent({ ...editingContent, img: e.target.value })} /></label>
              <label className="admin-field"><span>Đường dẫn đọc / xem chính</span><input value={editingContent.mainLink} onChange={e => setEditingContent({ ...editingContent, mainLink: e.target.value })} /></label>
            </div>
          </div>
        </div>

        <label className="admin-field"><span>Mô tả chi tiết tác phẩm (Do Admin biên tập)</span>
          <textarea value={editingContent.description} onChange={e => setEditingContent({ ...editingContent, description: e.target.value })} placeholder="Nhập nội dung mô tả chi tiết cho bộ truyện hoặc phim..." />
        </label>

        <div className="admin-field">
          <span>Thể loại ({editingContent.genres.length} đã chọn)</span>
          <div className="admin-genre-picks">
            {allGenres.slice(0, 18).map(g => <button key={g} type="button" className={editingContent.genres.includes(g) ? "active" : ""} onClick={() => {
              const next = editingContent.genres.includes(g) ? editingContent.genres.filter(x => x !== g) : [...editingContent.genres, g];
              setEditingContent({ ...editingContent, genres: next });
            }}>{g}</button>)}
          </div>
        </div>

        <div className="modal-actions">
          <Button variant="secondary" icon="plus" onClick={() => {
            const target = editingContent;
            setEditingContent(null);
            setManagingChaptersFor(target);
          }}>Quản lý Chương / Tập ({editingContent.chapters.length})</Button>
          <div>
            <Button variant="ghost" onClick={() => setEditingContent(null)}>Hủy</Button>
            <Button icon="check" onClick={saveEditedContent}>Lưu thay đổi</Button>
          </div>
        </div>
      </div>
    </div>}

    {/* MODAL 4: QUẢN LÝ & CẬP NHẬT CHƯƠNG / TẬP */}
    {managingChaptersFor && <div className="modal-backdrop" onMouseDown={() => setManagingChaptersFor(null)}>
      <div className="admin-modal-wide" onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>CẬP NHẬT CHƯƠNG & TẬP PHIM</span>
            <h2>{managingChaptersFor.title}</h2>
            <p>Thêm, sửa, xóa và cập nhật đường dẫn riêng cho từng chương truyện hoặc tập phim.</p>
          </div>
          <button className="icon-btn" onClick={() => setManagingChaptersFor(null)}><Icon name="x" /></button>
        </div>

        <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ fontSize: "11px" }}>Danh sách hiện có ({managingChaptersFor.chapters.length} {managingChaptersFor.type === "Truyện" ? "chương" : "tập"})</b>
          <Button variant="secondary" icon="plus" onClick={() => {
            const nextNum = String(managingChaptersFor.chapters.length + 1);
            setManagingChaptersFor({
              ...managingChaptersFor,
              chapters: [
                ...managingChaptersFor.chapters,
                { id: Date.now(), season: "Mùa 1", number: nextNum, title: `${managingChaptersFor.type === "Truyện" ? "Chương" : "Tập"} ${nextNum}`, url: "https://", note: "" },
              ],
            });
          }}>+ Thêm {managingChaptersFor.type === "Truyện" ? "chương mới" : "tập mới"}</Button>
        </div>

        <div>
          {managingChaptersFor.chapters.map((ch, idx) => <div className="admin-chap-row" key={ch.id}>
            <input value={ch.number} onChange={e => {
              const next = managingChaptersFor.chapters.map((x, i) => i === idx ? { ...x, number: e.target.value } : x);
              setManagingChaptersFor({ ...managingChaptersFor, chapters: next });
            }} placeholder="Số (1, 1.5)" />
            <input value={ch.title} onChange={e => {
              const next = managingChaptersFor.chapters.map((x, i) => i === idx ? { ...x, title: e.target.value } : x);
              setManagingChaptersFor({ ...managingChaptersFor, chapters: next });
            }} placeholder="Tiêu đề chương/tập" />
            <input value={ch.url} onChange={e => {
              const next = managingChaptersFor.chapters.map((x, i) => i === idx ? { ...x, url: e.target.value } : x);
              setManagingChaptersFor({ ...managingChaptersFor, chapters: next });
            }} placeholder="https://..." />
            <input value={ch.note} onChange={e => {
              const next = managingChaptersFor.chapters.map((x, i) => i === idx ? { ...x, note: e.target.value } : x);
              setManagingChaptersFor({ ...managingChaptersFor, chapters: next });
            }} placeholder="Ghi chú chương..." />
            <Button variant="danger" onClick={() => {
              setManagingChaptersFor({
                ...managingChaptersFor,
                chapters: managingChaptersFor.chapters.filter((_, i) => i !== idx),
              });
            }}>Xóa</Button>
          </div>)}
        </div>

        <div className="modal-actions">
          <Button variant="ghost" onClick={() => {
            const target = managingChaptersFor;
            setManagingChaptersFor(null);
            setEditingContent(target);
          }}>← Sửa thông tin chung</Button>
          <div>
            <Button variant="ghost" onClick={() => setManagingChaptersFor(null)}>Đóng</Button>
            <Button icon="check" onClick={saveChaptersModal}>Lưu danh sách chương/tập</Button>
          </div>
        </div>
      </div>
    </div>}
  </div></main>;
}

function PublicProfilePage({
  username,
  setPage,
  items,
  onSaveSharedItem,
  onOpenShareToChat,
}: {
  username: string;
  setPage: (page: string) => void;
  items: ContentItem[];
  onSaveSharedItem: (item: ContentItem) => void;
  onOpenShareToChat: (item: ContentItem) => void;
}) {
  const profiles: Record<string, { name: string; user: string; bio: string; img: string; banner: string; joined: string; friendsCount: number; sharedCount: number }> = {
    "@lananh": {
      name: "Lan Anh",
      user: "@lananh",
      bio: "Mê anime chữa lành, điện ảnh Nhật Bản và những bộ manga cyberpunk mang chiều sâu tâm lý.",
      img: photos.rain,
      banner: photos.hero,
      joined: "12/03/2024",
      friendsCount: 42,
      sharedCount: 8,
    },
    "@minhtran": {
      name: "Minh Trần",
      user: "@minhtran",
      bio: "Đọc shounen, xem sci-fi mỗi tối. Thích sưu tầm các bộ phim khoa học viễn tưởng kinh điển.",
      img: photos.city,
      banner: photos.lantern,
      joined: "05/11/2023",
      friendsCount: 31,
      sharedCount: 6,
    },
    "@hanguyen": {
      name: "Thu Hà",
      user: "@hanguyen",
      bio: "Một chiếc mọt truyện chính hiệu · Hay viết review dài cho những bộ truyện trinh thám.",
      img: photos.lantern,
      banner: photos.alley,
      joined: "20/01/2024",
      friendsCount: 19,
      sharedCount: 5,
    },
    "@tuanminh": {
      name: "Tuấn Minh",
      user: "@tuanminh",
      bio: "Review phim và manga trinh thám · Luôn sẵn sàng trao đổi list phim cuối tuần.",
      img: photos.street,
      banner: photos.city,
      joined: "14/07/2023",
      friendsCount: 54,
      sharedCount: 9,
    },
  };

  const [selectedUser, setSelectedUser] = useState(username || "@lananh");
  const profile = profiles[selectedUser] || profiles["@lananh"];
  const [filterType, setFilterType] = useState<"Tất cả" | "Truyện" | "Phim">("Tất cả");
  const [savedTitles, setSavedTitles] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [isFriend, setIsFriend] = useState(true);

  const friendExclusiveItems: ContentItem[] = [
    {
      title: "Hành Tinh Pha Lê",
      type: "Phim",
      sub: "Movie · 2025",
      genres: ["Sci-Fi", "Adventure"],
      score: "4.9",
      status: "Hoàn thành",
      img: photos.city,
      sharedFrom: { name: profile.name, user: profile.user, sharedAt: "Vừa lưu" },
    },
    {
      title: "Tiệm Cầm Đồ Thời Gian",
      type: "Truyện",
      sub: "K. Takahashi",
      genres: ["Fantasy", "Mystery", "Drama"],
      score: "4.8",
      status: "Muốn đọc / xem",
      img: photos.lantern,
      sharedFrom: { name: profile.name, user: profile.user, sharedAt: "Vừa lưu" },
    },
  ];

  const sharedItems = [...friendExclusiveItems, ...items.filter((_, idx) => idx % 3 !== 2)]
    .filter(item => filterType === "Tất cả" || item.type === filterType);

  const handleCopyToMyLibrary = (item: ContentItem) => {
    if (!savedTitles.includes(item.title)) {
      setSavedTitles([...savedTitles, item.title]);
    }
    onSaveSharedItem({
      ...item,
      sharedFrom: { name: profile.name, user: profile.user, sharedAt: "Vừa lưu" },
    });
    setToast(`Đã lưu “${item.title}” từ chia sẻ của ${profile.name} (${profile.user}) vào Thư viện của tôi!`);
    window.setTimeout(() => setToast(""), 3800);
  };

  return <main className="inner-page"><div className="page-shell">
    <div className="friend-switcher-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Button variant="ghost" onClick={() => setPage("library")}>← Quay lại thư viện</Button>
        <span style={{ fontSize: "10px", color: "#9e93ad", fontWeight: 600 }}>Xem hồ sơ bạn bè:</span>
      </div>
      <div className="friend-switcher-pills">
        {Object.keys(profiles).map(u => (
          <button
            key={u}
            className={`friend-pill-btn ${selectedUser === u ? "active" : ""}`}
            onClick={() => setSelectedUser(u)}
          >
            <img src={profiles[u].img} alt={profiles[u].name} />
            <span>{profiles[u].name} <small style={{ opacity: 0.75 }}>({u})</small></span>
          </button>
        ))}
      </div>
    </div>

    {toast && <div className="success-banner" style={{ marginBottom: "14px" }}><Icon name="check" /> {toast}<button onClick={() => setToast("")}>×</button></div>}

    <section className="public-profile-banner">
      <img className="banner-bg" src={profile.banner} alt="" />
      <div className="banner-overlay" />
      <div className="public-profile-content">
        <img className="pub-avatar" src={profile.img} alt={profile.name} />
        <div className="pub-info">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <h1>{profile.name}</h1>
            <span className="badge-pill active">🌐 Đang chia sẻ thư viện</span>
          </div>
          <span>{profile.user} · Thành viên từ {profile.joined}</span>
          <p>{profile.bio}</p>
          <div className="pub-stats">
            <div><b>{sharedItems.length}</b><small>Tác phẩm công khai</small></div>
            <div><b>{profile.friendsCount}</b><small>Bạn bè</small></div>
            <div><b>128</b><small>Lượt được lưu</small></div>
          </div>
        </div>
        <div className="pub-actions">
          <Button icon="message" onClick={() => setPage("chat")}>Nhắn tin</Button>
          <Button variant="secondary" icon={isFriend ? "check" : "plus"} onClick={() => setIsFriend(!isFriend)}>
            {isFriend ? "Bạn bè" : "Kết bạn"}
          </Button>
        </div>
      </div>
    </section>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
      <div>
        <SectionTitle eyebrow="THƯ VIỆN CỘNG ĐỒNG" title={`Tác phẩm được ${profile.name} chia sẻ (${sharedItems.length})`} />
        <p style={{ margin: "4px 0 0", fontSize: "10px", color: "#9e98ae" }}>
          🔒 Các mục đặt ở chế độ <b>Riêng tư (Private)</b> của {profile.name} đã được hệ thống tự động ẩn.
        </p>
      </div>
      <div className="segment">
        {(["Tất cả", "Truyện", "Phim"] as const).map(t => (
          <button key={t} className={filterType === t ? "active" : ""} onClick={() => setFilterType(t)}>{t}</button>
        ))}
      </div>
    </div>

    <div className="poster-grid">
      {sharedItems.map((item) => {
        const isSaved = savedTitles.includes(item.title);
        return (
          <article key={item.title} className="poster-card library-card">
            <div className="poster-image" onClick={() => setPage("detail")}>
              <img src={item.img} alt={item.title} />
              <span className="privacy shared">🌐 Công khai ({profile.user})</span>
            </div>
            <div className="poster-copy">
              <div className="content-type">{item.type === "Truyện" ? "MANGA" : "MOVIE"}</div>
              <h3 onClick={() => setPage("detail")} style={{ cursor: "pointer" }}>{item.title}</h3>
              <p className="personal-note">“Tác phẩm được {profile.name} chia sẻ công khai cùng cộng đồng.”</p>
              <Rating value={item.score} />
              <div className="card-actions" style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
                <Button
                  variant={isSaved ? "secondary" : "primary"}
                  icon={isSaved ? "check" : "plus"}
                  onClick={() => handleCopyToMyLibrary(item)}
                >
                  {isSaved ? "Đã lưu về thư viện" : "Lưu về thư viện"}
                </Button>
                <button className="icon-btn" title="Chia sẻ vào tin nhắn" onClick={() => onOpenShareToChat(item)}>
                  <Icon name="share" size={15} />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </div></main>;
}

const initialNotifications: NotificationItem[] = [
  { id: 1, type: "CHAPTER", icon: "📖", targetTitle: "Nightfall City", text: "vừa cập nhật Chương 10.5: Màn đêm buông xuống.", time: "12 phút trước", unread: true, targetPage: "detail" },
  { id: 2, type: "SHARE", icon: "🌐", targetTitle: "Lan Anh (@lananh)", text: "đã chia sẻ bộ phim “Thành Phố Không Ngủ” vào nhóm Hội mê manga.", time: "35 phút trước", unread: true, targetPage: "chat" },
  { id: 3, type: "COMMENT", icon: "💬", targetTitle: "Tuấn Minh (@tuanminh)", text: "đã trả lời bình luận của bạn trong “Nightfall City”.", time: "2 giờ trước", unread: true, targetPage: "detail" },
  { id: 4, type: "FRIEND", icon: "👋", targetTitle: "Thu Hà (@hanguyen)", text: "đã gửi cho bạn một lời mời kết bạn mới.", time: "1 ngày trước", unread: false, targetPage: "friends" },
  { id: 5, type: "CHAPTER", icon: "🎬", targetTitle: "Thành Phố Mưa", text: "vừa ra mắt Tập 9 (Mùa 1) với phụ đề Tiếng Việt.", time: "2 ngày trước", unread: false, targetPage: "detail" },
];

function NotificationsPage({
  notifications,
  setPage,
  onMarkAllRead,
  onReadNotification,
}: {
  notifications: NotificationItem[];
  setPage: (page: string) => void;
  onMarkAllRead: () => void;
  onReadNotification: (item: NotificationItem) => void;
}) {
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | "CHAPTER" | "SHARE" | "COMMENT">("ALL");

  const filtered = notifications.filter(n => {
    if (filter === "UNREAD") return n.unread;
    if (filter === "ALL") return true;
    return n.type === filter;
  });

  return <main className="inner-page"><div className="page-shell narrow-shell">
    <PageHeading
      eyebrow="TRUNG TÂM CẬP NHẬT"
      title="Tất cả thông báo"
      description="Theo dõi chương/tập mới phát hành, lượt chia sẻ từ bạn bè và phản hồi bình luận."
      action={<Button variant="secondary" icon="check" onClick={onMarkAllRead}>Đánh dấu tất cả đã đọc</Button>}
    />

    <div className="friend-tabs" style={{ marginBottom: "16px" }}>
      {[
        ["ALL", `Tất cả (${notifications.length})`],
        ["UNREAD", `Chưa đọc (${notifications.filter(x => x.unread).length})`],
        ["CHAPTER", "Chương / Tập mới"],
        ["SHARE", "Chia sẻ & Bạn bè"],
        ["COMMENT", "Bình luận & Thảo luận"],
      ].map(([k, label]) => (
        <button key={k} className={filter === k ? "active" : ""} onClick={() => setFilter(k as typeof filter)}>
          {label}
        </button>
      ))}
    </div>

    <div className="notif-page-list">
      {filtered.map(n => (
        <div
          key={n.id}
          className={`notif-card ${n.unread ? "unread" : ""}`}
          onClick={() => { onReadNotification(n); setPage(n.targetPage); }}
        >
          <div className="notif-icon">
            <Icon name={n.type === "CHAPTER" ? "book" : n.type === "SHARE" ? "share" : "message"} size={18} />
          </div>
          <div>
            <b>{n.targetTitle}</b>
            <p>{n.text}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <time>{n.time}</time>
            {n.unread && <div style={{ marginTop: "4px" }}><span className="badge-pill active">Mới</span></div>}
          </div>
        </div>
      ))}
      {!filtered.length && (
        <div className="empty-results">
          <Icon name="bell" size={28} />
          <b>Không có thông báo nào trong mục này</b>
          <p>Khi có chương mới hoặc tương tác từ bạn bè, thông báo sẽ xuất hiện tại đây.</p>
        </div>
      )}
    </div>
  </div></main>;
}

function CommandPaletteModal({
  items,
  onClose,
  onSelectContent,
  onSelectUser,
}: {
  items: ContentItem[];
  onClose: () => void;
  onSelectContent: (item: ContentItem) => void;
  onSelectUser: (username: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState<"ALL" | "Truyện" | "Phim" | "USERS">("ALL");

  const matchedContents = items.filter(item => {
    if (scope === "USERS") return false;
    if (scope !== "ALL" && item.type !== scope) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.sub.toLowerCase().includes(q) ||
      item.genres.some(g => g.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const matchedUsers = friendData.filter(u => {
    if (scope === "Truyện" || scope === "Phim") return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.user.toLowerCase().includes(q) || u.bio.toLowerCase().includes(q);
  });

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="cmd-palette" onMouseDown={e => e.stopPropagation()}>
      <div className="cmd-input-row">
        <Icon name="search" size={18} />
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Tìm nhanh truyện, bộ phim, tác giả, đạo diễn hoặc @username..."
        />
        {query && <button className="icon-btn" style={{ width: "26px", height: "26px" }} onClick={() => setQuery("")} title="Xóa từ khóa"><Icon name="x" size={13} /></button>}
        <kbd onClick={onClose} style={{ cursor: "pointer" }}>ESC</kbd>
      </div>
      <div className="cmd-scopes">
        {[
          ["ALL", "Tất cả kết quả"],
          ["Truyện", "Truyện (Manga)"],
          ["Phim", "Phim (Movies)"],
          ["USERS", "Người dùng (@user)"],
        ].map(([k, label]) => (
          <button key={k} className={scope === k ? "active" : ""} onClick={() => setScope(k as typeof scope)}>{label}</button>
        ))}
      </div>
      <div className="cmd-results">
        {matchedContents.length > 0 && <>
          <div className="cmd-group-title">TRUYỆN & PHIM ({matchedContents.length})</div>
          {matchedContents.map(item => (
            <div key={item.title} className="cmd-item" onClick={() => { onSelectContent(item); onClose(); }}>
              <div className="cmd-item-left">
                <img className="cmd-item-poster" src={item.img} alt={item.title} />
                <div className="cmd-item-info">
                  <b>{item.title}</b>
                  <span>{item.sub} · {item.genres.join(", ")}</span>
                </div>
              </div>
              <div className="cmd-item-right">
                <span className={`badge-pill ${item.type === "Truyện" ? "type-manga" : "type-movie"}`}>
                  {item.type === "Truyện" ? "MANGA" : "MOVIE"}
                </span>
                <span className="cmd-score-pill">★ {item.score} / 5</span>
              </div>
            </div>
          ))}
        </>}

        {matchedUsers.length > 0 && <>
          <div className="cmd-group-title">CỘNG ĐỒNG & BẠN BÈ ({matchedUsers.length})</div>
          {matchedUsers.map(u => (
            <div key={u.user} className="cmd-item" onClick={() => { onSelectUser(u.user); onClose(); }}>
              <div className="cmd-item-left">
                <img className="cmd-item-avatar" src={u.img} alt={u.name} />
                <div className="cmd-item-info">
                  <b>{u.name} <span style={{ display: "inline", color: "#b89eff", fontWeight: 500, marginLeft: "4px" }}>{u.user}</span></b>
                  <span>{u.bio}</span>
                </div>
              </div>
              <div className="cmd-item-right">
                <span className="badge-pill active">Xem thư viện →</span>
              </div>
            </div>
          ))}
        </>}

        {matchedContents.length === 0 && matchedUsers.length === 0 && (
          <div className="empty-results" style={{ margin: "12px 0" }}>
            <Icon name="search" size={24} />
            <b>Không tìm thấy kết quả phù hợp</b>
            <p>Hãy thử tìm bằng từ khóa khác hoặc tên tác giả/đạo diễn.</p>
          </div>
        )}
      </div>
      <div className="cmd-foot">
        <span><kbd>Click</kbd> Mở chi tiết tác phẩm hoặc thư viện bạn bè</span>
        <span><kbd>Ctrl + K</kbd> Bật/Tắt nhanh · <kbd>ESC</kbd> Đóng</span>
      </div>
    </div>
  </div>;
}

function ShareToChatModal({
  initialItem,
  items,
  onClose,
  onSharedSuccess,
}: {
  initialItem: ContentItem | null;
  items: ContentItem[];
  onClose: () => void;
  onSharedSuccess: (targetChat: string, item: ContentItem) => void;
}) {
  const [selectedTitle, setSelectedTitle] = useState(initialItem?.title || items[0]?.title || "Nightfall City");
  const [selectedConv, setSelectedConv] = useState(initialConversationStates[0].name);
  const [note, setNote] = useState("Bộ này cuốn lắm, cậu thử xem nhé!");
  const [permissionMode, setPermissionMode] = useState<"VIEW_ONLY" | "ALLOW_COPY">("ALLOW_COPY");

  const chosenItem = items.find(x => x.title === selectedTitle) || initialItem || items[0];

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="admin-modal-wide" style={{ width: "520px" }} onMouseDown={e => e.stopPropagation()}>
      <div className="modal-head">
        <div>
          <span>CHIA SẺ QUA TIN NHẮN NỘI BỘ</span>
          <h2>Gửi Thẻ Truyện / Phim Vào Chat</h2>
          <p>Tác phẩm sẽ hiển thị dưới dạng Media Card trực quan trong cuộc trò chuyện.</p>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
      </div>

      <label className="admin-field">
        <span>Chọn tác phẩm từ thư viện để chia sẻ</span>
        <select value={selectedTitle} onChange={e => setSelectedTitle(e.target.value)}>
          {items.map(it => <option key={it.title} value={it.title}>[{it.type}] {it.title} (★ {it.score})</option>)}
        </select>
      </label>

      {chosenItem && (
        <div style={{ display: "flex", gap: "12px", padding: "10px", borderRadius: "12px", background: "rgba(155,89,255,.1)", border: "1px solid rgba(155,89,255,.28)", marginBottom: "12px", alignItems: "center" }}>
          <img src={chosenItem.img} alt={chosenItem.title} style={{ width: "44px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
          <div>
            <b style={{ fontSize: "12px" }}>{chosenItem.title}</b>
            <p style={{ margin: "2px 0 0", fontSize: "10px", color: "#bdb6ce" }}>{chosenItem.type} · {chosenItem.sub} · ★ {chosenItem.score}</p>
          </div>
        </div>
      )}

      <div className="admin-field-two">
        <label className="admin-field">
          <span>Gửi đến cuộc trò chuyện (1-1 / Nhóm)</span>
          <select value={selectedConv} onChange={e => setSelectedConv(e.target.value)}>
            {initialConversationStates.map(c => <option key={c.name} value={c.name}>{c.group ? "👥 Nhóm: " : "👤 Bạn bè: "}{c.name}</option>)}
          </select>
        </label>
        <label className="admin-field">
          <span>Quyền truy cập khi chia sẻ</span>
          <select value={permissionMode} onChange={e => setPermissionMode(e.target.value as "VIEW_ONLY" | "ALLOW_COPY")}>
            <option value="ALLOW_COPY">Cho phép lưu về thư viện</option>
            <option value="VIEW_ONLY">Chỉ xem (View Only)</option>
          </select>
        </label>
      </div>

      <label className="admin-field">
        <span>Lời nhắn đính kèm</span>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Viết lời nhắn gửi kèm thẻ tác phẩm..." />
      </label>

      <div className="modal-actions">
        <div />
        <div>
          <Button variant="ghost" onClick={onClose}>Hủy</Button>
          <Button icon="send" onClick={() => { if (chosenItem) onSharedSuccess(selectedConv, chosenItem); onClose(); }}>Gửi vào {selectedConv}</Button>
        </div>
      </div>
    </div>
  </div>;
}

function ReportModal({
  targetType,
  targetName,
  onClose,
  onSubmitted,
}: {
  targetType: "CONTENT" | "COMMENT";
  targetName: string;
  onClose: () => void;
  onSubmitted: (reason: string) => void;
}) {
  const [reason, setReason] = useState("Đường dẫn (Link) đọc/xem bị hỏng hoặc sai nguồn");
  const [details, setDetails] = useState("");

  const reasons = targetType === "CONTENT"
    ? [
        "Đường dẫn (Link) đọc/xem bị hỏng hoặc sai nguồn",
        "Thông tin tác giả / thể loại / mô tả chưa chính xác",
        "Nội dung vi phạm quy tắc cộng đồng hoặc trùng lặp",
      ]
    : [
        "Bình luận tiết lộ cốt truyện (Spoiler) nhưng không gắn cảnh báo",
        "Ngôn từ đả kích, spam hoặc quấy rối người dùng khác",
        "Chèn liên kết độc hại / quảng cáo trái phép",
      ];

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="admin-modal-wide" style={{ width: "480px" }} onMouseDown={e => e.stopPropagation()}>
      <div className="modal-head">
        <div>
          <span>BÁO CÁO VI PHẠM / BÁO LỖI</span>
          <h2>Báo cáo: {targetName}</h2>
          <p>Báo cáo của bạn sẽ được gửi tới Bảng điều khiển Quản trị viên (Admin) để kiểm duyệt.</p>
        </div>
        <button className="icon-btn" onClick={onClose}><Icon name="x" /></button>
      </div>

      <label className="admin-field">
        <span>Lý do báo cáo ({targetType === "CONTENT" ? "Nội dung Truyện/Phim" : "Bình luận"})</span>
        <select value={reason} onChange={e => setReason(e.target.value)}>
          {reasons.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>

      <label className="admin-field">
        <span>Mô tả chi tiết thêm (Tùy chọn)</span>
        <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Cung cấp thêm thông tin chương/tập bị lỗi hoặc chi tiết vi phạm..." />
      </label>

      <div className="modal-actions">
        <div />
        <div>
          <Button variant="ghost" onClick={onClose}>Hủy</Button>
          <Button variant="danger" icon="flag" onClick={() => { onSubmitted(details ? `${reason} (${details})` : reason); onClose(); }}>Gửi báo cáo</Button>
        </div>
      </div>
    </div>
  </div>;
}

export default function App() {
  const [page, setPage] = useState("login");
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"USER" | "ADMIN">("USER");
  const [favorites, setFavorites] = useState<string[]>(["Nightfall City", "Lồng Đèn Đỏ"]);
  const [allContents, setAllContents] = useState<ContentItem[]>(libraryItems);
  const [publishedTitle, setPublishedTitle] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [searchOpen, setSearchOpen] = useState(false);
  const [publicProfileUser, setPublicProfileUser] = useState("@lananh");
  const [shareModalItem, setShareModalItem] = useState<ContentItem | null | undefined>(undefined);
  const [reportTarget, setReportTarget] = useState<{ type: "CONTENT" | "COMMENT"; name: string } | null>(null);
  const [globalToast, setGlobalToast] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const showGlobalToast = (msg: string) => {
    setGlobalToast(msg);
    window.setTimeout(() => setGlobalToast(""), 3500);
  };

  const toggleFavorite = (title: string) => setFavorites(current => current.includes(title) ? current.filter(x => x !== title) : [...current, title]);

  const handleUpdatePublishedContent = (oldTitle: string, updated: ContentItem) => {
    setAllContents(prev => prev.map(x => (x.title === oldTitle ? updated : x)));
    if (publishedTitle === oldTitle && updated.title !== oldTitle) {
      setPublishedTitle(updated.title);
    }
    if (oldTitle !== updated.title && favorites.includes(oldTitle)) {
      setFavorites(prev => prev.map(f => (f === oldTitle ? updated.title : f)));
    }
  };

  const navigate = (target: string) => {
    if (target === "login") {
      setAuthenticated(false);
      setPage(target);
      return;
    }
    if (target === "admin" && userRole !== "ADMIN") {
      showGlobalToast("Bạn đang đăng nhập với quyền Người dùng (USER). Mục Quản trị chỉ dành riêng cho Quản trị viên (ADMIN)!");
      setPage("home");
      return;
    }
    setPage(target);
  };

  const handleSwitchRole = (nextRole: "USER" | "ADMIN") => {
    setUserRole(nextRole);
    if (nextRole === "USER" && page === "admin") {
      setPage("home");
    }
    showGlobalToast(
      nextRole === "ADMIN"
        ? "Đã chuyển sang quyền Quản trị viên (ADMIN) — Mục Quản trị đã được hiển thị trên thanh điều hướng."
        : "Đã chuyển sang quyền Người dùng (USER) — Mục Quản trị đã được ẩn khỏi giao diện."
    );
  };

  const openPublicProfile = (username: string) => {
    setPublicProfileUser(username);
    setPage("public-profile");
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markNotificationRead = (item: NotificationItem) => {
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
    setPage(item.targetPage);
  };

  if (!authenticated || page === "login" || page === "register") {
    return (
      <div className="app">
        <AuthPage
          mode={page === "register" ? "register" : "login"}
          setPage={navigate}
          onAuthenticated={role => {
            setUserRole(role);
            setAuthenticated(true);
          }}
        />
      </div>
    );
  }
  return <div className="app">
    <Navbar
      page={page}
      setPage={navigate}
      userRole={userRole}
      onSwitchRole={handleSwitchRole}
      onOpenSearch={() => setSearchOpen(true)}
      notifications={notifications}
      onMarkAllRead={markAllNotificationsRead}
      onReadNotification={markNotificationRead}
    />
    {globalToast && (
      <div className="page-shell" style={{ paddingTop: "12px" }}>
        <div className="success-banner"><Icon name="check" /> {globalToast}<button onClick={() => setGlobalToast("")}>×</button></div>
      </div>
    )}
    {page === "home" && (
      <HomePage
        setPage={navigate}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        savedItems={allContents}
        onSelectContent={item => setPublishedTitle(item.title)}
        onSaveToLibrary={(item, options) => {
          setAllContents(prev => {
            const exists = prev.some(x => x.title === item.title);
            if (exists) {
              return prev.map(x => (x.title === item.title ? { ...x, status: item.status } : x));
            }
            return [item, ...prev];
          });
          if (options?.favorite && !favorites.includes(item.title)) {
            setFavorites(prev => [...prev, item.title]);
          } else if (options && !options.favorite && favorites.includes(item.title)) {
            setFavorites(prev => prev.filter(x => x !== item.title));
          }
        }}
        onRemoveFromLibrary={title => setAllContents(prev => prev.filter(x => x.title !== title))}
      />
    )}
    {page === "manga" && (
      <ListingPage
        mode="Truyện"
        setPage={navigate}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        savedItems={allContents}
        onSelectContent={item => setPublishedTitle(item.title)}
        onToggleLibraryItem={item => {
          setAllContents(prev => {
            const exists = prev.some(x => x.title === item.title);
            if (exists) {
              showGlobalToast(`Đã gỡ “${item.title}” khỏi Thư viện của tôi.`);
              return prev.filter(x => x.title !== item.title);
            }
            showGlobalToast(`Đã lưu “${item.title}” vào Thư viện của tôi!`);
            return [item, ...prev];
          });
        }}
      />
    )}
    {page === "movies" && (
      <ListingPage
        mode="Phim"
        setPage={navigate}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        savedItems={allContents}
        onSelectContent={item => setPublishedTitle(item.title)}
        onToggleLibraryItem={item => {
          setAllContents(prev => {
            const exists = prev.some(x => x.title === item.title);
            if (exists) {
              showGlobalToast(`Đã gỡ “${item.title}” khỏi Thư viện của tôi.`);
              return prev.filter(x => x.title !== item.title);
            }
            showGlobalToast(`Đã lưu “${item.title}” vào Thư viện của tôi!`);
            return [item, ...prev];
          });
        }}
      />
    )}
    {page === "library" && (
      <LibraryPage
        setPage={navigate}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        items={allContents}
        userRole={userRole}
        onOpenPublicProfile={openPublicProfile}
        onOpenShareToChat={item => setShareModalItem(item)}
        onRemoveFromLibrary={title => setAllContents(prev => prev.filter(x => x.title !== title))}
        onRestoreToLibrary={item => setAllContents(prev => (prev.some(x => x.title === item.title) ? prev : [item, ...prev]))}
        onUpdatePublishedContent={handleUpdatePublishedContent}
        onSelectContent={item => setPublishedTitle(item.title)}
      />
    )}
    {page === "detail" && (
      <DetailPage
        publishedTitle={publishedTitle}
        savedItems={allContents}
        favorites={favorites}
        userRole={userRole}
        onToggleLibrary={item => {
          setAllContents(prev =>
            prev.some(x => x.title === item.title)
              ? prev.filter(x => x.title !== item.title)
              : [item, ...prev]
          );
        }}
        onToggleFavorite={toggleFavorite}
        onOpenShareToChat={item => setShareModalItem(item)}
        onOpenReport={(type, name) => setReportTarget({ type, name })}
        onOpenPublicProfile={openPublicProfile}
        onUpdatePublishedContent={handleUpdatePublishedContent}
        onDeletePublishedContent={title => {
          setAllContents(prev => prev.filter(x => x.title !== title));
          showGlobalToast(`Đã xóa vĩnh viễn tác phẩm “${title}” khỏi hệ thống!`);
          navigate("library");
        }}
      />
    )}
    {page === "chat" && (
      <ChatPage
        setPage={navigate}
        onOpenShareToChat={item => setShareModalItem(item ?? null)}
        onOpenPublicProfile={openPublicProfile}
        onSaveSharedToLibrary={item => {
          setAllContents(prev => {
            const exists = prev.some(x => x.title === item.title);
            if (exists) {
              return prev.map(x => (x.title === item.title ? { ...x, sharedFrom: item.sharedFrom ?? x.sharedFrom } : x));
            }
            return [item, ...prev];
          });
        }}
      />
    )}
    {page === "account" && <AccountPage setPage={navigate} />}
    {page === "settings" && <SettingsPage setPage={navigate} />}
    {page === "friends" && <FriendsPage setPage={navigate} onOpenPublicProfile={openPublicProfile} />}
    {page === "public-profile" && (
      <PublicProfilePage
        username={publicProfileUser}
        setPage={navigate}
        items={allContents}
        onSaveSharedItem={item => {
          setAllContents(prev => {
            const exists = prev.some(x => x.title === item.title);
            if (exists) {
              return prev.map(x => (x.title === item.title ? { ...x, sharedFrom: item.sharedFrom ?? x.sharedFrom } : x));
            }
            return [item, ...prev];
          });
        }}
        onOpenShareToChat={item => setShareModalItem(item)}
      />
    )}
    {page === "notifications" && (
      <NotificationsPage
        notifications={notifications}
        setPage={navigate}
        onMarkAllRead={markAllNotificationsRead}
        onReadNotification={markNotificationRead}
      />
    )}
    {page === "admin" && userRole === "ADMIN" && <AdminPage setPage={navigate} contents={allContents} setContents={setAllContents} />}
    {page === "publish" && <PublishPage setPage={navigate} onPublish={item => { setAllContents(current => [item, ...current]); setPublishedTitle(item.title); navigate("detail"); }} />}

    {searchOpen && (
      <CommandPaletteModal
        items={allContents}
        onClose={() => setSearchOpen(false)}
        onSelectContent={item => { setPublishedTitle(item.title); navigate("detail"); }}
        onSelectUser={username => openPublicProfile(username)}
      />
    )}

    {shareModalItem !== undefined && (
      <ShareToChatModal
        initialItem={shareModalItem}
        items={allContents}
        onClose={() => setShareModalItem(undefined)}
        onSharedSuccess={(targetChat, item) => {
          showGlobalToast(`Đã chia sẻ thẻ “${item.title}” vào cuộc trò chuyện “${targetChat}”!`);
        }}
      />
    )}

    {reportTarget && (
      <ReportModal
        targetType={reportTarget.type}
        targetName={reportTarget.name}
        onClose={() => setReportTarget(null)}
        onSubmitted={reason => {
          showGlobalToast(`Đã gửi báo cáo vi phạm cho “${reportTarget.name}”: ${reason}`);
        }}
      />
    )}
  </div>;
}
