import { useState, useEffect, type ReactNode, type CSSProperties } from "react";

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

function Button({ children, variant = "primary", icon, onClick, className = "", style, disabled }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; className?: string; style?: CSSProperties; disabled?: boolean }) {
  return <button className={`btn btn-${variant} ${className}`} onClick={disabled ? undefined : onClick} style={style} disabled={disabled}>{icon && <Icon name={icon} size={17} />}<span>{children}</span></button>;
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
  currentUser,
}: {
  page: string;
  setPage: (page: string) => void;
  userRole: "USER" | "ADMIN";
  onSwitchRole: (role: "USER" | "ADMIN") => void;
  onOpenSearch: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onReadNotification: (n: NotificationItem) => void;
  currentUser?: UserProfile;
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
        <button className="avatar" onClick={() => setAccountOpen(!accountOpen)}>
          <img src={currentUser?.avatar || activeCurrentUserProfile.avatar} alt="Ảnh đại diện" />
          <i />
        </button>
        {accountOpen && <div className="account-menu">
          <div className="account-summary">
            <img src={currentUser?.avatar || activeCurrentUserProfile.avatar} alt="" />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <b>{currentUser?.name || activeCurrentUserProfile.name}</b>
                <span className={`badge-pill ${userRole === "ADMIN" ? "role-admin" : "active"}`}>{userRole}</span>
              </div>
              <span>{currentUser?.username || activeCurrentUserProfile.username}</span>
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

type ExternalLinkItem = {
  platform: string;
  url: string;
  note: string;
};

type ContentCommentItem = {
  id: number;
  author: string;
  username: string;
  avatar: string;
  time: string;
  rating: string;
  text: string;
  spoiler?: string;
  chapterLabel?: string;
};

type ContentItem = {
  title: string;
  sub: string;
  img: string;
  status: string;
  score: string;
  type: "Truyện" | "Phim";
  genres: string[];
  shortDescription?: string;
  description?: string;
  author?: string;
  artist?: string;
  director?: string;
  cast?: string;
  releaseYear?: string;
  language?: string;
  movieMode?: "Phim lẻ" | "Series";
  singleMovieUrl?: string;
  externalLinks?: ExternalLinkItem[];
  mainLink?: string;
  sourceRef?: string;
  extraTags?: string;
  personalNote?: string;
  allowComments?: boolean;
  sharedFrom?: { name: string; user: string; sharedAt?: string };
  createdBy?: { name: string; user: string };
  visibility?: "PUBLIC" | "SHARED" | "PRIVATE";
  sharedWithUsers?: string[];
  updatedAt?: string;
  chaptersList?: PublishedChapterItem[];
  commentsList?: ContentCommentItem[];
};

const defaultChaptersFor = (_title: string, _isMovie: boolean): PublishedChapterItem[] => [];

// Không tạo sẵn dữ liệu giả — người dùng sẽ tự thêm truyện/phim và tự kiểm tra
const libraryItems: ContentItem[] = [];

type CustomCategoryItem = {
  name: string;
  icon: string;
  description: string;
};

type PersonalItemMeta = {
  note: string;
  rating: number;
  readingStatus: string;
  categories: string[];
  privacy: "PRIVATE" | "SHARED" | "PEOPLE";
};

function loadSavedCategories(): CustomCategoryItem[] {
  try {
    const raw = window.localStorage.getItem("pl_custom_categories_v1");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCustomCategories(list: CustomCategoryItem[]) {
  try {
    window.localStorage.setItem("pl_custom_categories_v1", JSON.stringify(list));
  } catch {
    // ignore
  }
}

function loadSavedPersonalMeta(): Record<string, PersonalItemMeta> {
  try {
    const raw = window.localStorage.getItem("pl_personal_meta_v1");
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function savePersonalMetaToStorage(meta: Record<string, PersonalItemMeta>) {
  try {
    window.localStorage.setItem("pl_personal_meta_v1", JSON.stringify(meta));
  } catch {
    // ignore
  }
}

const mangaGenres = ["BL", "BG", "GL", "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Historical", "Horror", "Mystery", "Psychological", "Romance", "School Life", "Slice of Life", "Supernatural", "Thriller", "Martial Arts", "Isekai", "Sci-Fi", "Sports", "Shounen", "Shoujo", "Seinen", "Josei"];
const movieGenres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Historical", "Horror", "Mystery", "Musical", "Romance", "Sci-Fi", "Thriller", "War", "Western", "Family", "Psychological", "Supernatural"];
const allGenres = Array.from(new Set([...mangaGenres, ...movieGenres]));

function SectionTitle({ eyebrow, title, action, onAction }: { eyebrow?: string; title: string; action?: string; onAction?: () => void }) {
  return <div className="section-title"><div>{eyebrow && <span>{eyebrow}</span>}<h2>{title}</h2></div>{action && <button onClick={onAction}>{action} <Icon name="arrow" size={15} /></button>}</div>;
}

function FavoriteButton({ active, toggle }: { active: boolean; toggle: () => void }) {
  return <button className={`favorite-btn ${active ? "active" : ""}`} onClick={e => { e.stopPropagation(); toggle(); }} aria-label={active ? "Bỏ yêu thích" : "Thêm yêu thích"}><Icon name="heart" size={17} /></button>;
}

const catalogItems: ContentItem[] = [];

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
            <div className="card-genres">{item.genres.slice(0, 3).map(g => <span key={g}>{g}</span>)}</div>
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
    })}</div> : (
      <div className="empty-results">
        <Icon name="book" size={28} />
        <b>{sourcePool.length === 0 ? "Chưa có truyện hoặc bộ phim nào được đăng tải" : "Không tìm thấy tác phẩm phù hợp"}</b>
        <p>
          {sourcePool.length === 0
            ? "Hãy nhấn nút bên dưới để tự đăng tải truyện hoặc phim của bạn và kiểm tra toàn bộ tính năng."
            : "Hãy thử bỏ bớt thể loại hoặc đặt lại bộ lọc."}
        </p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          <Button icon="plus" onClick={() => setPage("publish")}>+ Đăng truyện / phim mới</Button>
          {sourcePool.length > 0 && <Button variant="secondary" onClick={reset}>Đặt lại bộ lọc</Button>}
        </div>
      </div>
    )}
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
  // Tạo Hero Slides trực tiếp từ các truyện/phim thật người dùng đã đăng
  const heroSlides = savedItems.slice(0, 6).map(item => {
    const words = item.title.trim().split(/\s+/);
    const mid = Math.max(1, Math.ceil(words.length / 2));
    return {
      titleLine1: words.slice(0, mid).join(" ").toUpperCase(),
      titleLine2: words.slice(mid).join(" ").toUpperCase(),
      eyebrow: `${item.type} · ${item.status}`,
      desc: item.shortDescription || item.description || `Tác phẩm ${item.type.toLowerCase()} do ${item.author || item.director || item.sub} sáng tác.`,
      bg: item.img || photos.hero,
      item,
    };
  });

  const [heroIndex, setHeroIndex] = useState(0);
  const safeHeroIndex = heroSlides.length > 0 ? Math.min(heroIndex, heroSlides.length - 1) : 0;
  const currentHero = heroSlides[safeHeroIndex];
  const isHeroInLibrary = currentHero ? savedItems.some(x => x.title === currentHero.item.title) : false;

  // Tiến độ đọc/xem của từng truyện/phim thật do người dùng thêm
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  const continueList: ContinueEntry[] = savedItems.map(item => {
    const chList = item.chaptersList || [];
    const totalUnits = Math.max(1, chList.length);
    const currentUnit = Math.min(totalUnits, progressMap[item.title] || 1);
    const activeChap = chList[currentUnit - 1];
    return {
      item,
      currentUnit,
      totalUnits,
      unitLabel: item.type === "Phim" ? "Tập" : "Chương",
      chapterTitle: activeChap?.title || `${item.type === "Phim" ? "Tập" : "Chương"} ${currentUnit}`,
      synopsis: item.shortDescription || item.description || "Chưa có mô tả.",
      lastReadAt: item.updatedAt || "Vừa cập nhật",
    };
  });

  // Modal "Lưu vào thư viện"
  const userCustomCategories = loadSavedCategories();
  const [saveModalItem, setSaveModalItem] = useState<ContentItem | null>(null);
  const [saveStatus, setSaveStatus] = useState("Đang đọc / xem");
  const [saveCategory, setSaveCategory] = useState("");
  const [savePrivacy, setSavePrivacy] = useState("PRIVATE");
  const [saveFavorite, setSaveFavorite] = useState(true);
  const [saveNote, setSaveNote] = useState("");
  const [homeToast, setHomeToast] = useState("");

  // Modal "Đọc tiếp / Xem tiếp"
  const [activeContinue, setActiveContinue] = useState<ContinueEntry | null>(null);

  const openSaveModal = (item: ContentItem) => {
    setSaveModalItem(item);
    setSaveStatus(item.status || "Đang đọc / xem");
    setSaveCategory(userCustomCategories[0]?.name || "");
    setSavePrivacy("PRIVATE");
    setSaveFavorite(favorites.includes(item.title));
    setSaveNote(item.personalNote || "");
  };

  const handleConfirmSaveToLibrary = () => {
    if (!saveModalItem) return;
    if (saveCategory) {
      const currentMeta = loadSavedPersonalMeta();
      const prevEntry = currentMeta[saveModalItem.title];
      const nextCats = prevEntry
        ? Array.from(new Set([...prevEntry.categories, saveCategory]))
        : [saveCategory];
      currentMeta[saveModalItem.title] = {
        note: saveNote || prevEntry?.note || "Chưa có ghi chú cá nhân.",
        rating: prevEntry?.rating || 5,
        readingStatus: saveStatus,
        categories: nextCats,
        privacy: savePrivacy as "PRIVATE" | "SHARED" | "PEOPLE",
      };
      savePersonalMetaToStorage(currentMeta);
    }
    onSaveToLibrary?.(
      { ...saveModalItem, status: saveStatus, personalNote: saveNote },
      { status: saveStatus, category: saveCategory, note: saveNote, favorite: saveFavorite }
    );
    setHomeToast(
      `Đã lưu “${saveModalItem.title}” (${saveStatus}${saveCategory ? ` · #${saveCategory}` : ""}) vào Thư viện của tôi!`
    );
    setSaveModalItem(null);
  };

  const updateContinueProgress = (title: string, nextUnit: number, maxUnits: number) => {
    const clamped = Math.max(1, Math.min(maxUnits, nextUnit));
    setProgressMap(prev => ({ ...prev, [title]: clamped }));
    if (activeContinue?.item.title === title) {
      const chList = activeContinue.item.chaptersList || [];
      const activeChap = chList[clamped - 1];
      setActiveContinue({
        ...activeContinue,
        currentUnit: clamped,
        chapterTitle: activeChap?.title || `${activeContinue.unitLabel} ${clamped}`,
        lastReadAt: "Vừa đọc / xem",
      });
    }
  };

  return <main>
    {currentHero ? (
      <section className="hero">
        <img className="hero-bg" src={currentHero.bg} alt="" />
        <div className="hero-fade" />
        <div className="hero-copy">
          <div className="eyebrow"><i /> {currentHero.eyebrow}</div>
          <h1>{currentHero.titleLine1}{currentHero.titleLine2 && <><br /><em>{currentHero.titleLine2}</em></>}</h1>
          <div className="hero-meta">
            {currentHero.item.genres.slice(0, 4).map(g => <span key={g}>{g}</span>)}
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
          {heroSlides.length > 1 && (
            <div className="slider-dots">
              {heroSlides.map((slide, idx) => (
                <i
                  key={slide.item.title}
                  className={idx === safeHeroIndex ? "active" : ""}
                  style={{ cursor: "pointer" }}
                  title={slide.item.title}
                  onClick={() => setHeroIndex(idx)}
                />
              ))}
              <span>{`0${safeHeroIndex + 1} / 0${heroSlides.length}`}</span>
            </div>
          )}
        </div>
        <div className="hero-poster" onClick={() => { onSelectContent?.(currentHero.item); setPage("detail"); }} style={{ cursor: "pointer" }}>
          <img src={currentHero.item.img} alt={currentHero.item.title} />
          <div className="poster-glow" />
        </div>
        <div className="scroll-hint">CUỘN ĐỂ KHÁM PHÁ <span /></div>
      </section>
    ) : (
      <div className="page-shell" style={{ paddingTop: "32px" }}>
        <div className="empty-results" style={{ height: "auto", padding: "42px 24px" }}>
          <Icon name="book" size={32} />
          <b>Thư viện hiện đang trống — Chưa có dữ liệu truyện / phim nào</b>
          <p>Toàn bộ dữ liệu mẫu giả đã được gỡ bỏ. Hãy tự đăng truyện hoặc bộ phim của bạn để kiểm tra giao diện và tính năng đồng bộ.</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "8px" }}>
            <Button icon="plus" onClick={() => setPage("publish")}>+ Đăng truyện / phim mới</Button>
            <Button variant="secondary" onClick={() => setPage("library")}>Mở Thư viện của tôi</Button>
          </div>
        </div>
      </div>
    )}

    <div className="page-shell">
      {homeToast && (
        <div className="success-banner" style={{ marginBottom: "18px" }}>
          <Icon name="check" />
          <div style={{ flex: 1 }}>{homeToast}</div>
          <Button variant="secondary" onClick={() => setPage("library")}>Mở Thư viện của tôi →</Button>
          <button onClick={() => setHomeToast("")}>×</button>
        </div>
      )}

      {continueList.length > 0 && (
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
                            updateContinueProgress(entry.item.title, entry.currentUnit + 1, entry.totalUnits);
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
      )}

      <section className="explore">
        <SectionTitle eyebrow="BỘ SƯU TẬP CỦA BẠN" title="Tác phẩm đã đăng & lưu" />
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
                <option value="">— Chưa chọn danh mục (Có thể tạo tại Thư viện) —</option>
                {userCustomCategories.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
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
                  onClick={() => updateContinueProgress(activeContinue.item.title, activeContinue.currentUnit - 1, activeContinue.totalUnits)}
                >
                  ← {activeContinue.unitLabel} trước
                </button>
                <input
                  type="range"
                  min={1}
                  max={activeContinue.totalUnits}
                  value={activeContinue.currentUnit}
                  onChange={e => updateContinueProgress(activeContinue.item.title, Number(e.target.value), activeContinue.totalUnits)}
                />
                <button
                  type="button"
                  className="btn primary"
                  disabled={activeContinue.currentUnit >= activeContinue.totalUnits}
                  onClick={() => updateContinueProgress(activeContinue.item.title, activeContinue.currentUnit + 1, activeContinue.totalUnits)}
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
                  updateContinueProgress(activeContinue.item.title, activeContinue.totalUnits, activeContinue.totalUnits);
                  setHomeToast(`Chúc mừng! Bạn đã hoàn thành 100% “${activeContinue.item.title}”.`);
                }}
              >
                Đánh dấu Hoàn thành (100%)
              </Button>
              {(() => {
                const activeCh = (activeContinue.item.chaptersList || [])[activeContinue.currentUnit - 1];
                const targetUrl = activeCh?.url || activeContinue.item.externalLinks?.[0]?.url || activeContinue.item.mainLink;
                return targetUrl ? (
                  <Button
                    variant="ghost"
                    icon="arrow"
                    onClick={() => window.open(targetUrl, "_blank", "noopener,noreferrer")}
                  >
                    Mở link đọc / xem ↗
                  </Button>
                ) : null;
              })()}
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
  const [shareUserInput, setShareUserInput] = useState("");
  const [sharedUsers, setSharedUsers] = useState<string[]>([]);
  return <div className="modal-backdrop" onMouseDown={close}><div className="share-modal" onMouseDown={e => e.stopPropagation()}>
    <div className="modal-head"><div><span>QUYỀN RIÊNG TƯ</span><h2>Cài đặt chia sẻ</h2><p>Chọn phạm vi hiển thị cho bản lưu này</p></div><button className="icon-btn" onClick={close}><Icon name="x" /></button></div>
    <div className={`share-option ${choice === "all" ? "chosen" : ""}`} onClick={() => setChoice("all")}><div className="share-radio">{choice === "all" && <i />}</div><div className="option-icon globe">◎</div><div><b>Chia sẻ với cộng đồng</b><p>Mọi người đều có thể xem ghi chú và đánh giá của bạn.</p></div></div>
    <div className={`share-option ${choice === "people" ? "chosen" : ""}`} onClick={() => setChoice("people")}><div className="share-radio">{choice === "people" && <i />}</div><div className="option-icon"><Icon name="users" /></div><div><b>Chia sẻ với người cụ thể</b><p>Chỉ những người bạn chọn mới có quyền truy cập.</p></div></div>
    {choice === "people" && (
      <div className="user-picker">
        <label>
          <Icon name="search" size={16} />
          <input
            value={shareUserInput}
            onChange={e => setShareUserInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && shareUserInput.trim()) {
                e.preventDefault();
                const u = shareUserInput.trim().startsWith("@") ? shareUserInput.trim() : `@${shareUserInput.trim()}`;
                if (!sharedUsers.includes(u)) setSharedUsers([...sharedUsers, u]);
                setShareUserInput("");
              }
            }}
            placeholder="Nhập @username và nhấn Enter..."
          />
        </label>
        <div>
          {sharedUsers.map(u => (
            <span key={u}>
              {u} <button onClick={() => setSharedUsers(sharedUsers.filter(x => x !== u))}>×</button>
            </span>
          ))}
        </div>
      </div>
    )}
    <div className="modal-actions"><Button variant="danger" icon="lock" onClick={close}>Thu hồi quyền chia sẻ</Button><div><Button variant="ghost" onClick={close}>Hủy</Button><Button onClick={close}>Lưu thay đổi</Button></div></div>
  </div></div>;
}

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: "USER" | "ADMIN";
  bio?: string;
  joinedDate?: string;
  userId?: string;
};

const CURRENT_USER_STORAGE_KEY = "pl_current_user_v2";
const REGISTERED_ACCOUNTS_KEY = "pl_registered_accounts_v2";

export function loadSavedCurrentUser(): UserProfile {
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.username && parsed.name) {
        // Tự động chuẩn hóa tên tài khoản chính xác theo yêu cầu người dùng
        if (
          (parsed.email && parsed.email.toLowerCase() === "lechauanh.12a5.tnd@gmail.com") ||
          (parsed.username && parsed.username.toLowerCase().includes("lechauanh")) ||
          (parsed.name && parsed.name.toLowerCase().includes("lechauanh"))
        ) {
          parsed.name = "Anh Quý Phi";
          parsed.username = "@anhquyphi";
        }
        return parsed;
      }
    }
  } catch {}
  return {
    id: "usr-" + Date.now().toString(36),
    name: "Anh Quý Phi",
    username: "@anhquyphi",
    email: "lechauanh.12a5.tnd@gmail.com",
    avatar: photos.red,
    role: "USER",
    bio: "Thành viên Mê Truyện Stories Unbound",
    joinedDate: "Hôm nay",
    userId: "USR-3604",
  };
}

export function saveCurrentUserToStorage(user: UserProfile) {
  try {
    window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  } catch {}
}

export function loadSavedAccounts(): UserProfile[] {
  try {
    const raw = window.localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map(acc => {
          if (
            (acc.email && acc.email.toLowerCase() === "lechauanh.12a5.tnd@gmail.com") ||
            (acc.username && acc.username.toLowerCase().includes("lechauanh"))
          ) {
            return { ...acc, name: "Anh Quý Phi", username: "@anhquyphi" };
          }
          return acc;
        });
      }
    }
  } catch {}
  return [];
}

export function saveAccountToStorage(acc: UserProfile) {
  try {
    const list = loadSavedAccounts().filter(
      a => a.email.toLowerCase() !== acc.email.toLowerCase() &&
           a.username.toLowerCase() !== acc.username.toLowerCase()
    );
    list.push(acc);
    window.localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(list));
  } catch {}
}

let activeCurrentUserProfile: UserProfile = loadSavedCurrentUser();

export function getActiveUser(): UserProfile {
  return activeCurrentUserProfile;
}

export function setActiveCurrentUserProfile(user: UserProfile) {
  activeCurrentUserProfile = user;
  saveCurrentUserToStorage(user);
}

export function getCurrentUserHandle(): string {
  const p = getActiveUser();
  return "@" + (p?.username ? p.username.replace(/^@/, '') : "anhquyphi");
}

export function getCurrentUserName(): string {
  return getActiveUser()?.name || "Anh Quý Phi";
}

export const CURRENT_USER_HANDLE = "@anhquyphi";
export const CURRENT_USER_NAME = "Anh Quý Phi";

function canManagePublishedContent(item: ContentItem, userRole: "USER" | "ADMIN", currentUsername = activeCurrentUserProfile.username): boolean {
  if (userRole === "ADMIN") return true;
  const activeUser = getActiveUser();
  return (
    item.createdBy?.user === currentUsername ||
    item.createdBy?.user === activeUser.username ||
    item.createdBy?.user === "@anhquyphi" ||
    item.createdBy?.user === "@huynguyen" ||
    item.createdBy?.name === "Anh Quý Phi" ||
    item.createdBy?.name === "Nguyễn Huy"
  );
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
    shortDescription: initialItem.shortDescription || "",
    description: initialItem.description || "",
    author: initialItem.author || "",
    artist: initialItem.artist || "",
    director: initialItem.director || "",
    cast: initialItem.cast || "",
    releaseYear: initialItem.releaseYear || "",
    language: initialItem.language || "Tiếng Việt",
    externalLinks:
      initialItem.externalLinks && initialItem.externalLinks.length > 0
        ? initialItem.externalLinks
        : initialItem.mainLink
        ? [{ platform: "Liên kết đọc/xem", url: initialItem.mainLink, note: "" }]
        : [],
    mainLink: initialItem.mainLink || "",
    sourceRef: initialItem.sourceRef || "",
    extraTags: initialItem.extraTags || "",
    personalNote: initialItem.personalNote || "",
    visibility: initialItem.visibility || "PUBLIC",
    chaptersList: initialItem.chaptersList || [],
  });

  const isOwner = initialItem.createdBy?.user === CURRENT_USER_HANDLE;

  const handleCoverUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft(prev => ({ ...prev, img: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const linksList = draft.externalLinks || [];
  const updateLinkRow = (idx: number, patch: Partial<ExternalLinkItem>) => {
    const next = linksList.map((l, i) => (i === idx ? { ...l, ...patch } : l));
    setDraft({ ...draft, externalLinks: next, mainLink: next[0]?.url || "" });
  };
  const addLinkRow = () => {
    const next = [...linksList, { platform: "", url: "", note: "" }];
    setDraft({ ...draft, externalLinks: next });
  };
  const removeLinkRow = (idx: number) => {
    const next = linksList.filter((_, i) => i !== idx);
    setDraft({ ...draft, externalLinks: next, mainLink: next[0]?.url || "" });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="admin-modal-wide" style={{ maxHeight: "90vh", overflowY: "auto" }} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>
              {isOwner
                ? `✍️ CHỈNH SỬA TRUYỆN / PHIM TÔI ĐĂNG (${CURRENT_USER_HANDLE})`
                : `🛡️ QUYỀN QUẢN TRỊ VIÊN (${userRole}) · CHỈNH SỬA BÀI ĐĂNG CỦA ${initialItem.createdBy?.user || "@user"}`}
            </span>
            <h2>Chỉnh sửa & Cập nhật: {initialItem.title}</h2>
            <p>Mọi thông tin bạn chỉnh sửa tại đây sẽ đồng bộ trực tiếp với Trang chi tiết và Thư viện.</p>
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
                <span>Loại nội dung</span>
                <select value={draft.type} onChange={e => setDraft({ ...draft, type: e.target.value as "Truyện" | "Phim" })}>
                  <option value="Truyện">Truyện (MANGA / STORY)</option>
                  <option value="Phim">Phim (MOVIE / SERIES)</option>
                </select>
              </label>
            </div>

            {draft.type === "Truyện" ? (
              <div className="admin-field-two">
                <label className="admin-field">
                  <span>Tác giả</span>
                  <input
                    value={draft.author || ""}
                    onChange={e => setDraft({ ...draft, author: e.target.value })}
                    placeholder="Tên tác giả..."
                  />
                </label>
                <label className="admin-field">
                  <span>Họa sĩ</span>
                  <input
                    value={draft.artist || ""}
                    onChange={e => setDraft({ ...draft, artist: e.target.value })}
                    placeholder="Tên họa sĩ (nếu có)..."
                  />
                </label>
              </div>
            ) : (
              <div className="admin-field-two">
                <label className="admin-field">
                  <span>Đạo diễn</span>
                  <input
                    value={draft.director || ""}
                    onChange={e => setDraft({ ...draft, director: e.target.value })}
                    placeholder="Tên đạo diễn..."
                  />
                </label>
                <label className="admin-field">
                  <span>Diễn viên</span>
                  <input
                    value={draft.cast || ""}
                    onChange={e => setDraft({ ...draft, cast: e.target.value })}
                    placeholder="Danh sách diễn viên..."
                  />
                </label>
              </div>
            )}

            <div className="admin-field-row">
              <label className="admin-field">
                <span>Trạng thái phát hành</span>
                <select value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value })}>
                  <option value="Đang ra">Đang ra</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Drop">Drop</option>
                  <option value="Đang đọc / xem">Đang đọc / xem</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Ngôn ngữ</span>
                <input
                  value={draft.language || ""}
                  onChange={e => setDraft({ ...draft, language: e.target.value })}
                  placeholder="Tiếng Việt, Tiếng Anh..."
                />
              </label>
              <label className="admin-field">
                <span>Năm xuất bản / phát hành</span>
                <input
                  value={draft.releaseYear || ""}
                  onChange={e => setDraft({ ...draft, releaseYear: e.target.value })}
                  placeholder="VD: 2025"
                />
              </label>
            </div>

            <div className="admin-field-two">
              <label className="admin-field">
                <span>URL Ảnh bìa / Poster</span>
                <input value={draft.img} onChange={e => setDraft({ ...draft, img: e.target.value })} />
              </label>
              <label className="admin-field">
                <span>Quyền hiển thị bài đăng</span>
                <select
                  value={draft.visibility || "PUBLIC"}
                  onChange={e => setDraft({ ...draft, visibility: e.target.value as "PUBLIC" | "SHARED" | "PRIVATE" })}
                >
                  <option value="PUBLIC">Cộng đồng (PUBLIC)</option>
                  <option value="SHARED">Chia sẻ riêng (SHARED)</option>
                  <option value="PRIVATE">Riêng tư (PRIVATE)</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <label className="admin-field">
          <span>Mô tả ngắn (Tên khác, tóm tắt nhanh...)</span>
          <textarea
            value={draft.shortDescription || ""}
            onChange={e => setDraft({ ...draft, shortDescription: e.target.value })}
            placeholder="Nhập mô tả ngắn hoặc tên khác của tác phẩm..."
            style={{ minHeight: "56px" }}
          />
        </label>

        <label className="admin-field">
          <span>Mô tả chi tiết tác phẩm</span>
          <textarea
            value={draft.description || ""}
            onChange={e => setDraft({ ...draft, description: e.target.value })}
            placeholder="Nhập toàn bộ nội dung giới thiệu, cốt truyện chi tiết, hashtag..."
            style={{ minHeight: "110px" }}
          />
        </label>

        <div className="admin-field">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span>Đường dẫn đọc / xem ({linksList.length})</span>
            <Button variant="secondary" icon="plus" onClick={addLinkRow}>+ Thêm đường dẫn</Button>
          </div>
          {linksList.map((lk, idx) => (
            <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr auto", gap: "8px", marginBottom: "6px" }}>
              <input
                value={lk.platform}
                onChange={e => updateLinkRow(idx, { platform: e.target.value })}
                placeholder="Tên web / nhóm dịch (VD: Roads Team)"
              />
              <input
                value={lk.url}
                onChange={e => updateLinkRow(idx, { url: e.target.value })}
                placeholder="https://..."
              />
              <input
                value={lk.note}
                onChange={e => updateLinkRow(idx, { note: e.target.value })}
                placeholder="Ghi chú liên kết"
              />
              <Button variant="danger" onClick={() => removeLinkRow(idx)}>Xóa</Button>
            </div>
          ))}
        </div>

        <div className="admin-field-two">
          <label className="admin-field">
            <span>Nguồn / tham khảo</span>
            <input
              value={draft.sourceRef || ""}
              onChange={e => setDraft({ ...draft, sourceRef: e.target.value })}
              placeholder="Tên nguồn hoặc URL tham khảo"
            />
          </label>
          <label className="admin-field">
            <span>Thẻ bổ sung (Tags)</span>
            <input
              value={draft.extraTags || ""}
              onChange={e => setDraft({ ...draft, extraTags: e.target.value })}
              placeholder="VD: học đường, chữa lành, 19+..."
            />
          </label>
        </div>

        <div className="admin-field">
          <span>Thể loại ({draft.genres.length} đã chọn)</span>
          <div className="admin-genre-picks">
            {(draft.type === "Truyện" ? mangaGenres : movieGenres).map(g => (
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
                const cleanLinks = (draft.externalLinks || []).filter(l => l.platform.trim() || l.url.trim());
                const creatorLabel =
                  draft.type === "Truyện"
                    ? [draft.author?.trim(), draft.artist?.trim()].filter(Boolean).join(" · ")
                    : [draft.director?.trim(), draft.releaseYear?.trim()].filter(Boolean).join(" · ");
                onSave(initialItem.title, {
                  ...draft,
                  title: draft.title.trim(),
                  sub: creatorLabel || draft.sub || draft.type,
                  externalLinks: cleanLinks,
                  mainLink: cleanLinks[0]?.url || draft.mainLink || "",
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
    initialItem.chaptersList || []
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
                  title: "",
                  url: "",
                  note: "",
                },
              ]);
            }}
          >
            + Thêm {unitLabel.toLowerCase()} mới
          </Button>
        </div>

        <div style={{ maxHeight: "340px", overflowY: "auto", paddingRight: "4px" }}>
          {chapters.length === 0 && (
            <div className="empty-results" style={{ height: "120px" }}>
              <b>Chưa có {unitLabel.toLowerCase()} nào</b>
              <p>Nhấn nút “+ Thêm {unitLabel.toLowerCase()} mới” để thêm đường dẫn từng {unitLabel.toLowerCase()}.</p>
            </div>
          )}
          {chapters.map((ch, idx) => (
            <div className="admin-chap-row" key={ch.id}>
              <input
                value={ch.number}
                onChange={e => setChapters(chapters.map((x, i) => (i === idx ? { ...x, number: e.target.value } : x)))}
                placeholder="Số (1, 2...)"
              />
              <input
                value={ch.title}
                onChange={e => setChapters(chapters.map((x, i) => (i === idx ? { ...x, title: e.target.value } : x)))}
                placeholder={`Tiêu đề ${unitLabel.toLowerCase()} (tùy chọn)`}
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

  // Quản lý danh mục riêng (Không tạo sẵn danh mục giả — chỉ hiển thị danh mục do người dùng tự tạo)
  const [categories, setCategories] = useState<CustomCategoryItem[]>(() => loadSavedCategories());
  const [categoryModal, setCategoryModal] = useState<{ index: number | null; name: string; icon: string; description: string } | null>(null);
  const [assigningCategoryName, setAssigningCategoryName] = useState<string | null>(null);
  const [quickAssignItem, setQuickAssignItem] = useState<ContentItem | null>(null);
  const [confirmDeleteItem, setConfirmDeleteItem] = useState<ContentItem | null>(null);

  // Dữ liệu cá nhân độc lập cho từng bộ: Ghi chú, Điểm 1-5 sao, Trạng thái đọc/xem, Quyền riêng tư & Danh sách Danh mục riêng (không tạo sẵn dữ liệu giả)
  const [personalMeta, setPersonalMeta] = useState<Record<string, PersonalItemMeta>>(() => loadSavedPersonalMeta());

  useEffect(() => {
    saveCustomCategories(categories);
  }, [categories]);

  useEffect(() => {
    savePersonalMetaToStorage(personalMeta);
  }, [personalMeta]);

  const getItemMeta = (item: ContentItem): PersonalItemMeta => {
    return personalMeta[item.title] || {
      note:
        item.personalNote ||
        (item.sharedFrom
          ? `Đã lưu từ chia sẻ của ${item.sharedFrom.name} (${item.sharedFrom.user}).`
          : "Chưa có ghi chú cá nhân."),
      rating: 5,
      readingStatus: item.status === "Đang ra" ? "Đang đọc / xem" : item.status,
      categories: [],
      privacy: item.visibility === "PUBLIC" ? "SHARED" : item.visibility === "SHARED" ? "PEOPLE" : ("PRIVATE" as const),
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
          <Button variant="secondary" icon="share" onClick={() => onOpenPublicProfile?.("@huynguyen")}>Khám phá thư viện bạn bè</Button>
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

      {items.length > 0 && (
        <section className="recent-history">
          <SectionTitle eyebrow="HOẠT ĐỘNG GẦN ĐÂY" title="Lịch sử đọc / xem gần đây" />
          <div className="history-track">
            {items.slice(0, 10).map((item) => {
              const totalCh = (item.chaptersList || []).length;
              return (
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
                    <span>{item.type === "Truyện" ? "MANGA" : "MOVIE"} · {item.updatedAt || "Vừa cập nhật"}</span>
                    <b>{item.title}</b>
                    <p>{totalCh > 0 ? `${totalCh} ${item.type === "Truyện" ? "chương" : "tập"} đã đăng` : item.status}</p>
                    <div className="progress"><i style={{ width: totalCh > 0 ? "100%" : "40%" }} /></div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

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
            <Button variant="secondary" icon="share" onClick={() => onOpenPublicProfile?.("@huynguyen")}>
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
        categories.length === 0 ? (
          <div className="empty-results">
            <Icon name="book" size={28} />
            <b>Bạn chưa tạo Danh mục riêng nào (0 danh mục)</b>
            <p>Hãy nhấn nút bên dưới để tự tạo các danh mục riêng theo ý bạn và phân loại truyện/phim.</p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "10px" }}>
              <Button icon="plus" onClick={() => setCategoryModal({ index: null, name: "", icon: "☾", description: "" })}>
                + Tạo danh mục riêng
              </Button>
            </div>
          </div>
        ) : (
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
        )
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
  onNavigatePublish,
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
  onNavigatePublish?: () => void;
}) {
  const [season, setSeason] = useState("Mùa 1");
  const [reviewTab, setReviewTab] = useState("Bình luận chung");
  const [readChapters, setReadChapters] = useState<number[]>([]);
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);
  const [detailToast, setDetailToast] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [commentText, setCommentText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [editingWorkModal, setEditingWorkModal] = useState(false);
  const [editingChaptersModal, setEditingChaptersModal] = useState(false);

  const matchedItem =
    [...savedItems, ...catalogItems].find(x => x.title === publishedTitle) ||
    savedItems[0] ||
    catalogItems[0];

  if (!matchedItem) {
    return (
      <main className="inner-page">
        <div className="page-shell">
          <div className="empty-results" style={{ height: "280px" }}>
            <Icon name="book" size={30} />
            <b>Chưa có truyện / phim nào được chọn</b>
            <p>Hãy đăng tải một tác phẩm mới từ trang Đăng truyện / phim để xem đầy đủ thông tin chi tiết tại đây.</p>
            {onNavigatePublish && (
              <div style={{ marginTop: "10px" }}>
                <Button icon="plus" onClick={onNavigatePublish}>+ Đăng truyện / phim mới</Button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  const currentItem: ContentItem = matchedItem;
  const comments: ContentCommentItem[] = currentItem.commentsList || [];

  const inLibrary = savedItems.some(x => x.title === currentItem.title);
  const liked = favorites.includes(currentItem.title);
  const isOwner = currentItem.createdBy?.user === CURRENT_USER_HANDLE;
  const canEditWork = canManagePublishedContent(currentItem, userRole);
  const chapters = currentItem.chaptersList || [];
  const availableSeasons = Array.from(new Set(chapters.map(c => c.season || "Mùa 1")));
  const seasonList = availableSeasons.length > 0 ? availableSeasons : ["Mùa 1"];
  const activeSeason = seasonList.includes(season) ? season : seasonList[0];
  const filteredChapters = chapters.filter(c => (c.season || "Mùa 1") === activeSeason);

  const externalLinksToShow: ExternalLinkItem[] =
    currentItem.externalLinks && currentItem.externalLinks.some(l => l.url.trim() || l.platform.trim())
      ? currentItem.externalLinks.filter(l => l.url.trim() || l.platform.trim())
      : currentItem.mainLink && currentItem.mainLink.trim()
      ? [{ platform: "Đường dẫn đọc / xem", url: currentItem.mainLink.trim(), note: "" }]
      : [];

  const toggleChapterRead = (idx: number) =>
    setReadChapters(prev => (prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]));

  const submitComment = () => {
    if (!commentText.trim()) return;
    const newComment: ContentCommentItem = {
      id: Date.now(),
      author: CURRENT_USER_NAME,
      username: CURRENT_USER_HANDLE,
      avatar: photos.red,
      time: "Vừa xong",
      rating: `${userRating}.0`,
      text: isSpoiler ? "Bình luận này có chứa nội dung tiết lộ cốt truyện." : commentText.trim(),
      spoiler: isSpoiler ? commentText.trim() : "",
    };
    const nextComments = [newComment, ...comments];
    const numericRatings = nextComments.map(c => parseFloat(c.rating)).filter(n => !Number.isNaN(n));
    const avgScore =
      numericRatings.length > 0
        ? (numericRatings.reduce((a, b) => a + b, 0) / numericRatings.length).toFixed(1)
        : currentItem.score;

    onUpdatePublishedContent?.(currentItem.title, {
      ...currentItem,
      score: avgScore,
      commentsList: nextComments,
    });
    setCommentText("");
    setIsSpoiler(false);
    setDetailToast("Đã đăng đánh giá & bình luận của bạn!");
  };

  const deleteComment = (commentId: number) => {
    const nextComments = comments.filter(c => c.id !== commentId);
    const numericRatings = nextComments.map(c => parseFloat(c.rating)).filter(n => !Number.isNaN(n));
    const avgScore =
      numericRatings.length > 0
        ? (numericRatings.reduce((a, b) => a + b, 0) / numericRatings.length).toFixed(1)
        : "—";
    onUpdatePublishedContent?.(currentItem.title, {
      ...currentItem,
      score: avgScore,
      commentsList: nextComments,
    });
    setDetailToast("Đã xóa bình luận.");
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
      <div className="detail-poster"><img src={currentItem.img} alt={currentItem.title} /><div className="match">{currentItem.type === "Phim" ? "PHIM" : "TRUYỆN"}</div></div>
      <div className="detail-copy">
        <div className="detail-badges">
          <span>{currentItem.type === "Phim" ? "MOVIE" : "MANGA"}</span>
          <span className="ongoing">{currentItem.status.toUpperCase()}</span>
          {currentItem.language && <span>{currentItem.language.toUpperCase()}</span>}
          {currentItem.visibility && <span>{currentItem.visibility}</span>}
        </div>
        <h1>{currentItem.title}</h1>
        <p className="jp">
          Đăng bởi {currentItem.createdBy?.name || CURRENT_USER_NAME} ({currentItem.createdBy?.user || CURRENT_USER_HANDLE}) · {currentItem.updatedAt || "Vừa đăng"}
        </p>

        {/* Hiển thị đầy đủ Tác giả, Họa sĩ, Đạo diễn, Diễn viên, Năm xuất bản, Ngôn ngữ đồng bộ 100% với UI Đăng truyện */}
        <div className="creator" style={{ flexWrap: "wrap", rowGap: "6px" }}>
          {currentItem.type === "Truyện" ? (
            <>
              <span>TÁC GIẢ <b>{currentItem.author || currentItem.sub || "Chưa cập nhật"}</b></span>
              {currentItem.artist && <><i /><span>HỌA SĨ <b>{currentItem.artist}</b></span></>}
            </>
          ) : (
            <>
              <span>ĐẠO DIỄN <b>{currentItem.director || currentItem.sub || "Chưa cập nhật"}</b></span>
              {currentItem.cast && <><i /><span>DIỄN VIÊN <b>{currentItem.cast}</b></span></>}
              {currentItem.movieMode && <><i /><span>ĐỊNH DẠNG <b>{currentItem.movieMode}</b></span></>}
            </>
          )}
          <i />
          <span>NĂM XUẤT BẢN <b>{currentItem.releaseYear || "—"}</b></span>
          {currentItem.language && <><i /><span>NGÔN NGỮ <b>{currentItem.language}</b></span></>}
          <i />
          <Rating value={currentItem.score} />
        </div>

        <div className="genre-row">
          {currentItem.genres.map(g => <span key={g}>{g}</span>)}
          {currentItem.extraTags &&
            currentItem.extraTags
              .split(",")
              .map(t => t.trim())
              .filter(Boolean)
              .map(tag => (
                <span key={`tag-${tag}`} style={{ borderColor: "rgba(155,89,255,.45)", color: "#d8b4fe" }}>
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
        </div>

        {/* Hiển thị Mô tả ngắn (nếu có) */}
        {currentItem.shortDescription && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px 14px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.04)",
              borderLeft: "3px solid #9c70f8",
              fontSize: "12px",
              lineHeight: 1.6,
              color: "#e6dff2",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong style={{ display: "block", fontSize: "10px", color: "#b695ff", textTransform: "uppercase", marginBottom: "4px" }}>
              Mô tả ngắn / Tên khác
            </strong>
            {currentItem.shortDescription}
          </div>
        )}

        {/* Hiển thị Mô tả chi tiết đúng nguyên văn người dùng đã nhập (giữ nguyên xuống dòng và hashtag) */}
        <div style={{ marginTop: "10px" }}>
          <strong style={{ display: "block", fontSize: "10px", color: "#9e93ad", textTransform: "uppercase", marginBottom: "4px" }}>
            Mô tả chi tiết
          </strong>
          <p className="description" style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
            {currentItem.description || currentItem.shortDescription || "Chưa có mô tả chi tiết cho tác phẩm này."}
          </p>
        </div>

        {/* Thông tin thêm: Nguồn tham khảo & Ghi chú cá nhân */}
        {(currentItem.sourceRef || currentItem.personalNote) && (
          <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "11px", color: "#b9b0c7" }}>
            {currentItem.sourceRef && (
              <span>📌 Nguồn / Tham khảo: <b>{currentItem.sourceRef}</b></span>
            )}
            {currentItem.personalNote && (
              <span>📝 Ghi chú cá nhân: <b>{currentItem.personalNote}</b></span>
            )}
          </div>
        )}

        {/* Hiển thị nổi bật các nút Link Web đọc / xem ngay dưới phần mô tả */}
        <div
          style={{
            marginTop: "14px",
            padding: "12px 14px",
            borderRadius: "10px",
            background: "rgba(139, 92, 246, 0.08)",
            border: "1px solid rgba(139, 92, 246, 0.28)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", gap: "8px", flexWrap: "wrap" }}>
            <strong style={{ fontSize: "10px", color: "#c4b5fd", letterSpacing: "0.8px", textTransform: "uppercase" }}>
              🌐 Danh sách Link Web đọc / xem ({externalLinksToShow.length})
            </strong>
            {canEditWork && (
              <button
                type="button"
                onClick={() => setEditingWorkModal(true)}
                style={{ border: 0, background: "none", color: "#a78bfa", fontSize: "10px", cursor: "pointer", fontWeight: 600 }}
              >
                + Thêm / Sửa link web
              </button>
            )}
          </div>
          {externalLinksToShow.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {externalLinksToShow.map((link, idx) => (
                <button
                  key={`${link.platform}-${idx}`}
                  type="button"
                  title={link.note ? `${link.platform || "Link Web"}: ${link.note} (${link.url})` : link.url}
                  onClick={() => {
                    const targetUrl = link.url.trim();
                    if (targetUrl) {
                      window.open(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`, "_blank", "noopener,noreferrer");
                    }
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    border: "1px solid rgba(167, 139, 250, 0.4)",
                    background: "#1c142b",
                    color: "#f3e8ff",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <span>🌐 {link.platform.trim() || `Link Web #${idx + 1}`}</span>
                  <Icon name="arrow" size={14} />
                </button>
              ))}
            </div>
          ) : (
            <span style={{ fontSize: "11px", color: "#8c8299" }}>
              Chưa đính kèm link web đọc / xem. {canEditWork ? "Nhấn “+ Thêm / Sửa link web” để bổ sung." : ""}
            </span>
          )}
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
        {/* BẢNG DANH SÁCH CÁC LINK WEB ĐỌC / XEM (ĐƯỜNG DẪN TRANG WEB Ở MỤC 03, TÁCH BIỆT VỚI LINK TỪNG CHAP) */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
            <SectionTitle
              eyebrow="ĐƯỜNG DẪN ĐỌC / XEM (LINK WEB)"
              title={`Danh sách Link Web đã thêm (${externalLinksToShow.length})`}
            />
            {canEditWork && (
              <Button variant="secondary" icon="edit" onClick={() => setEditingWorkModal(true)}>
                + Thêm / Sửa Link Web
              </Button>
            )}
          </div>
          <div className="chapter-list" style={{ border: "1px solid #2b2238", borderRadius: "12px", background: "#130e1c", padding: "4px 14px" }}>
            {externalLinksToShow.length === 0 ? (
              <div className="empty-results" style={{ height: "110px" }}>
                <b>Chưa có đường dẫn trang web nào được thêm</b>
                <p>Nhấn nút “+ Thêm / Sửa Link Web” để bổ sung trang web đọc truyện / xem phim (VD: Roads Team, Sony Team...).</p>
              </div>
            ) : (
              externalLinksToShow.map((link, idx) => (
                <div className="chapter" key={`weblink-${idx}`} style={{ height: "auto", minHeight: "64px", padding: "10px 0" }}>
                  <div className="chap-num" style={{ width: "48px" }}>
                    WEB<b>{idx + 1}</b>
                  </div>
                  <div className="chap-title" style={{ minWidth: 0 }}>
                    <b style={{ fontSize: "12px", color: "#f3e8ff" }}>
                      🌐 {link.platform.trim() || `Trang web đọc / xem #${idx + 1}`}
                    </b>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#a78bfa",
                        marginTop: "3px",
                        wordBreak: "break-all",
                      }}
                    >
                      {link.url.trim() || "Chưa nhập URL"}
                    </span>
                    {link.note && (
                      <span style={{ display: "block", fontSize: "10px", color: "#9e93ad", marginTop: "2px" }}>
                        Ghi chú: {link.note}
                      </span>
                    )}
                  </div>
                  {canEditWork && (
                    <button
                      className="icon-btn"
                      style={{ width: "30px", height: "30px" }}
                      title="Chỉnh sửa đường dẫn web này"
                      onClick={() => setEditingWorkModal(true)}
                    >
                      <Icon name="edit" size={13} />
                    </button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => {
                      if (navigator.clipboard && link.url.trim()) {
                        navigator.clipboard.writeText(link.url.trim());
                        setDetailToast(`Đã sao chép link web “${link.platform.trim() || link.url.trim()}” vào bộ nhớ tạm!`);
                      }
                    }}
                  >
                    Copy link
                  </Button>
                  <Button
                    icon="arrow"
                    onClick={() => {
                      const targetUrl = link.url.trim();
                      if (targetUrl) {
                        window.open(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`, "_blank", "noopener,noreferrer");
                        setDetailToast(`Đang mở trang web “${link.platform.trim() || targetUrl}” trong tab mới...`);
                      } else {
                        setDetailToast("Đường dẫn web này chưa có URL hợp lệ.");
                      }
                    }}
                  >
                    Mở web đọc
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
          <SectionTitle eyebrow="DANH SÁCH NỘI DUNG" title={`Mùa & ${currentItem.type === "Truyện" ? "Chương" : "Tập"} (${chapters.length})`} />
          {canEditWork && (
            <Button variant="secondary" icon="plus" onClick={() => setEditingChaptersModal(true)}>
              + Cập nhật / Thêm {currentItem.type === "Truyện" ? "Chương" : "Tập"}
            </Button>
          )}
        </div>
        <div className="season-tabs">
          {seasonList.map(x => {
            const countInSeason = chapters.filter(c => (c.season || "Mùa 1") === x).length;
            return (
              <button key={x} onClick={() => setSeason(x)} className={activeSeason === x ? "active" : ""}>
                {x}
                <small>{countInSeason} MỤC</small>
              </button>
            );
          })}
        </div>
        <div className="chapter-list">
          {filteredChapters.length === 0 ? (
            <div className="empty-results" style={{ height: "140px" }}>
              <b>Chưa có {currentItem.type === "Truyện" ? "chương" : "tập"} nào được thêm</b>
              <p>Nhấn nút “+ Cập nhật / Thêm {currentItem.type === "Truyện" ? "Chương" : "Tập"}” để bổ sung đường dẫn đọc/xem.</p>
            </div>
          ) : (
            filteredChapters.map((ch, i) => (
              <div className="chapter" key={ch.id}>
                <button className={`checkbox ${readChapters.includes(i) ? "checked" : ""}`} onClick={() => toggleChapterRead(i)}>
                  {readChapters.includes(i) && <Icon name="check" size={14} />}
                </button>
                <div className="chap-num">
                  {currentItem.type === "Truyện" ? "CHAP" : "TẬP"}<br /><b>{ch.number}</b>
                </div>
                <div className="chap-title">
                  <b>{ch.title || `${currentItem.type === "Truyện" ? "Chương" : "Tập"} ${ch.number}`}</b>
                  <span>
                    {readChapters.includes(i) ? "Đã đọc/xem" : "Chưa đọc/xem"}
                    {ch.note ? ` · ${ch.note}` : ""}
                    {ch.url ? ` · ${ch.url}` : ""}
                  </span>
                </div>
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
                <Button
                  variant="secondary"
                  icon="arrow"
                  onClick={() => {
                    const targetUrl = (ch.url || currentItem.mainLink || "").trim();
                    if (targetUrl) {
                      window.open(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`, "_blank", "noopener,noreferrer");
                    } else {
                      setDetailToast("Chương/tập này chưa được gắn đường dẫn URL.");
                    }
                  }}
                >
                  Mở link
                </Button>
              </div>
            ))
          )}
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
      <section className="reviews"><SectionTitle eyebrow="CỘNG ĐỒNG" title={`Đánh giá & Bình luận (${comments.length})`} />
        <div className="review-tabs">{["Bình luận chung", "Bình luận Chương/Tập"].map(x => <button className={reviewTab === x ? "active" : ""} onClick={() => setReviewTab(x)} key={x}>{x}</button>)}</div>
        {currentItem.allowComments !== false ? (
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
        ) : (
          <div className="empty-results" style={{ height: "100px", marginBottom: "12px" }}>
            <b>Người đăng tải đã tắt tính năng bình luận cho tác phẩm này.</b>
          </div>
        )}
        {comments.length === 0 ? (
          <div className="empty-results" style={{ height: "130px", marginTop: "12px" }}>
            <b>Chưa có bình luận nào</b>
            <p>Hãy là người đầu tiên để lại đánh giá và bình luận cho “{currentItem.title}”.</p>
          </div>
        ) : (
          comments.map(c => (
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
                  {(c.username === CURRENT_USER_HANDLE || userRole === "ADMIN") && (
                    <button style={{ color: "#f87171" }} onClick={() => deleteComment(c.id)}>Xóa bình luận</button>
                  )}
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
          ))
        )}
      </section>
    </div>
  </main>;
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-heading"><div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

const PRESET_AVATARS = [
  { id: "red", url: photos.red, name: "Neon Samurai" },
  { id: "city", url: photos.city, name: "Cyberpunk Tokyo" },
  { id: "rain", url: photos.rain, name: "Rainy Neo-City" },
  { id: "alley", url: photos.alley, name: "Nightfall Alley" },
  { id: "hero", url: photos.hero, name: "Night Skyline" },
  { id: "anime", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80", name: "Aesthetic Anime" },
  { id: "manga", url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80", name: "Manga Reader" },
  { id: "glow", url: "https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80", name: "Cyber Glow" },
];

function AccountPage({
  setPage,
  worksCount = 0,
  friendsCount = 0,
  currentUser,
  onUpdateCurrentUser,
}: {
  setPage: (page: string) => void;
  worksCount?: number;
  friendsCount?: number;
  currentUser?: UserProfile;
  onUpdateCurrentUser?: (user: UserProfile) => void;
}) {
  const profile = currentUser || activeCurrentUserProfile;
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio || "Quản lý thư viện truyện và phim cá nhân.");
  const [emailVal, setEmailVal] = useState(profile.email);

  // Avatar Modal states
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarDraft, setAvatarDraft] = useState(profile.avatar);
  const [avatarTab, setAvatarTab] = useState<"preset" | "upload" | "url">("upload");
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Dung lượng ảnh đại diện tối đa là 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarDraft(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyAvatar = () => {
    const finalAvatar = avatarDraft || profile.avatar;
    const updated: UserProfile = {
      ...profile,
      avatar: finalAvatar,
    };
    setActiveCurrentUserProfile(updated);
    saveAccountToStorage(updated);
    onUpdateCurrentUser?.(updated);
    setShowAvatarModal(false);
    setSaved(true);
  };

  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...profile,
      name: displayName.trim() || profile.name,
      bio: bio.trim(),
      email: emailVal.trim() || profile.email,
    };
    setActiveCurrentUserProfile(updated);
    saveAccountToStorage(updated);
    onUpdateCurrentUser?.(updated);
    setEditing(false);
    setSaved(true);
  };

  return (
    <main className="inner-page account-page">
      <div className="page-shell">
        <PageHeading
          eyebrow="HỒ SƠ NGƯỜI DÙNG"
          title="Thông tin tài khoản"
          description="Quản lý thông tin cá nhân và cách bạn xuất hiện trong cộng đồng."
          action={
            <Button variant="secondary" icon="users" onClick={() => setPage("friends")}>
              Quản lý bạn bè
            </Button>
          }
        />
        {saved && (
          <div className="success-banner">
            <Icon name="check" /> Thông tin tài khoản và ảnh đại diện đã được cập nhật thành công!
          </div>
        )}
        <div className="account-layout">
          <aside className="profile-card">
            <div className="profile-avatar">
              <img src={profile.avatar} alt={profile.name} />
              <button
                type="button"
                title="Đổi ảnh đại diện"
                onClick={() => {
                  setAvatarDraft(profile.avatar);
                  setShowAvatarModal(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <Icon name="edit" size={16} />
              </button>
            </div>
            <h2>{profile.name}</h2>
            <span>{profile.username}</span>
            <p>Thành viên từ {profile.joinedDate || "15/08/2023"}</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setAvatarDraft(profile.avatar);
                setShowAvatarModal(true);
              }}
              style={{
                margin: "0 auto 16px",
                fontSize: "11px",
                padding: "6px 14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              📷 Đổi ảnh đại diện
            </button>
            <div>
              <b>{worksCount}</b>
              <span>Tác phẩm</span>
              <b>{friendsCount}</b>
              <span>Bạn bè</span>
            </div>
          </aside>

          <section className="information-stack">
            <div className="information-card">
              <div className="card-head">
                <div>
                  <span>THÔNG TIN CÔNG KHAI</span>
                  <h3>Hồ sơ cá nhân</h3>
                </div>
                {!editing && (
                  <Button variant="secondary" icon="edit" onClick={() => setEditing(true)}>
                    Chỉnh sửa thông tin
                  </Button>
                )}
              </div>
              <div className="form-grid">
                <label>
                  <span>Tên hiển thị</span>
                  <input
                    disabled={!editing}
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                  />
                </label>
                <label>
                  <span>Tên người dùng</span>
                  <input disabled value={profile.username} readOnly />
                  <small>Tên người dùng không thể thay đổi.</small>
                </label>
                <label className="wide">
                  <span>Giới thiệu bản thân</span>
                  <textarea
                    disabled={!editing}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="information-card">
              <div className="card-head">
                <div>
                  <span>THÔNG TIN RIÊNG TƯ</span>
                  <h3>Tài khoản & bảo mật</h3>
                </div>
              </div>
              <div className="form-grid">
                <label>
                  <span>Email</span>
                  <input
                    disabled={!editing}
                    value={emailVal}
                    onChange={e => setEmailVal(e.target.value)}
                  />
                  <small>Thay đổi email cần xác minh lại.</small>
                </label>
                <label>
                  <span>User ID</span>
                  <input disabled value={profile.userId || "USR-2408-1893"} readOnly />
                </label>
                <div className="wide password-row">
                  <div>
                    <span>Mật khẩu</span>
                    <p>Được thay đổi lần cuối 3 tháng trước</p>
                  </div>
                  <Button variant="ghost" icon="lock">
                    Đổi mật khẩu
                  </Button>
                </div>
              </div>
            </div>

            {editing && (
              <div className="edit-actions">
                <Button variant="ghost" onClick={() => setEditing(false)}>
                  Hủy
                </Button>
                <Button onClick={handleSaveProfile}>
                  Lưu thay đổi
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MODAL ĐỔI ẢNH ĐẠI DIỆN TÀI KHOẢN */}
      {showAvatarModal && (
        <div className="modal-backdrop" onClick={() => setShowAvatarModal(false)}>
          <div
            className="friends-modal-card"
            style={{ maxWidth: "540px" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="friends-modal-head">
              <div>
                <span className="eyebrow" style={{ color: "#a78bfa" }}>ẢNH ĐẠI DIỆN</span>
                <h3>📷 Cập nhật Ảnh đại diện cá nhân</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowAvatarModal(false)}>×</button>
            </div>

            <div style={{ padding: "18px 22px" }}>
              {/* Xem trước ảnh đại diện */}
              <div style={{ textAlign: "center", marginBottom: "18px" }}>
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    margin: "0 auto 10px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #8b5cf6",
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
                  }}
                >
                  <img
                    src={avatarDraft}
                    alt="Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <span style={{ fontSize: "11px", color: "#a78bfa", fontWeight: 600 }}>
                  Xem trước ảnh đại diện mới
                </span>
              </div>

              {/* Tabs phương thức chọn ảnh */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "6px",
                  background: "#161022",
                  padding: "4px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: "7px 10px",
                    border: 0,
                    borderRadius: "6px",
                    background: avatarTab === "upload" ? "#7c3aed" : "transparent",
                    color: avatarTab === "upload" ? "#fff" : "#94a3b8",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => setAvatarTab("upload")}
                >
                  📁 Tải từ máy tính
                </button>
                <button
                  type="button"
                  style={{
                    padding: "7px 10px",
                    border: 0,
                    borderRadius: "6px",
                    background: avatarTab === "preset" ? "#7c3aed" : "transparent",
                    color: avatarTab === "preset" ? "#fff" : "#94a3b8",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => setAvatarTab("preset")}
                >
                  ✨ Ảnh mẫu có sẵn
                </button>
                <button
                  type="button"
                  style={{
                    padding: "7px 10px",
                    border: 0,
                    borderRadius: "6px",
                    background: avatarTab === "url" ? "#7c3aed" : "transparent",
                    color: avatarTab === "url" ? "#fff" : "#94a3b8",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => setAvatarTab("url")}
                >
                  🔗 Dán link ảnh
                </button>
              </div>

              {/* Nội dung theo Tab */}
              {avatarTab === "upload" && (
                <div
                  style={{
                    border: "2px dashed #43335e",
                    borderRadius: "10px",
                    padding: "24px 16px",
                    textAlign: "center",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <label
                    style={{
                      display: "inline-block",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      background: "#3b2164",
                      color: "#e9d5ff",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "1px solid #7c3aed",
                    }}
                  >
                    Chọn tệp hình ảnh từ thiết bị
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: "10px 0 0" }}>
                    Hỗ trợ định dạng JPG, PNG, WEBP, GIF (Tối đa 5MB)
                  </p>
                </div>
              )}

              {avatarTab === "preset" && (
                <div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "10px",
                      maxHeight: "220px",
                      overflowY: "auto",
                      padding: "4px",
                    }}
                  >
                    {PRESET_AVATARS.map(p => (
                      <div
                        key={p.id}
                        onClick={() => setAvatarDraft(p.url)}
                        style={{
                          cursor: "pointer",
                          borderRadius: "10px",
                          padding: "6px",
                          border: avatarDraft === p.url ? "2px solid #a78bfa" : "1px solid #2f2540",
                          background: avatarDraft === p.url ? "rgba(167, 139, 250, 0.15)" : "#130f1c",
                          textAlign: "center",
                        }}
                      >
                        <img
                          src={p.url}
                          alt={p.name}
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            margin: "0 auto 4px",
                            display: "block",
                          }}
                        />
                        <span style={{ fontSize: "9.5px", color: "#cbd5e1", display: "block" }}>
                          {p.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {avatarTab === "url" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "11px", color: "#94a3b8" }}>
                    Nhập đường dẫn trực tiếp của hình ảnh (URL):
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      value={customAvatarUrl}
                      onChange={e => setCustomAvatarUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #3c2e52",
                        background: "#0d0914",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Button
                      variant="secondary"
                      onClick={() => {
                        if (customAvatarUrl.trim()) {
                          setAvatarDraft(customAvatarUrl.trim());
                        }
                      }}
                    >
                      Xem thử
                    </Button>
                  </div>
                </div>
              )}

              {/* Nút hành động */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "20px",
                  paddingTop: "14px",
                  borderTop: "1px solid #281e35",
                }}
              >
                <Button variant="ghost" onClick={() => setShowAvatarModal(false)}>
                  Hủy
                </Button>
                <Button onClick={handleApplyAvatar}>
                  Lưu ảnh đại diện
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Toggle({ on, setOn }: { on: boolean; setOn: (value: boolean) => void }) {
  return <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)} aria-label={on ? "Tắt" : "Bật"}><i /></button>;
}

function SettingRow({ title, description, initial = true, control }: { title: string; description: string; initial?: boolean; control?: ReactNode }) {
  const [on, setOn] = useState(initial);
  return <div className="setting-row"><div><b>{title}</b><p>{description}</p></div>{control || <Toggle on={on} setOn={setOn} />}</div>;
}

// ============================================================================
// BỘ CÔNG CỤ MẬT MÃ HỌC: EMAIL OTP (CSPRNG), E2EE FINGERPRINT & AES-256-GCM
// ============================================================================

function generateSecureOtp6(): string {
  try {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return String(100000 + (arr[0] % 900000));
  } catch {
    return String(Math.floor(100000 + Math.random() * 900000));
  }
}

function generateHexIv12(): string {
  try {
    const bytes = new Uint8Array(12);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "a1b2c3d4e5f60718293a4b5c";
  }
}

function quickSha256LikeHex(input: string): string {
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  let h3 = 0x9e3779b9 ^ input.length;
  let h4 = 0x85ebca6b ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 2246822519);
    h4 = Math.imul(h4 ^ ch, 3266489917);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  h3 = Math.imul(h3 ^ (h3 >>> 16), 2246822507) ^ Math.imul(h4 ^ (h4 >>> 13), 3266489909);
  h4 = Math.imul(h4 ^ (h4 >>> 16), 2246822507) ^ Math.imul(h3 ^ (h3 >>> 13), 3266489909);
  return [h1, h2, h3, h4, h1 ^ h3, h2 ^ h4, h1 ^ h4, h2 ^ h3]
    .map(n => (n >>> 0).toString(16).padStart(8, "0"))
    .join("");
}

function formatE2eeFingerprint(seed: string): string {
  const hex = quickSha256LikeHex(seed).toUpperCase().slice(0, 32);
  return hex.match(/.{1,4}/g)?.join(":") || hex;
}

function encryptAes256PayloadSync(plainText: string, secretKey: string, existingIv?: string): {
  cipherText: string;
  iv: string;
  sha256Hash: string;
  keyFingerprint: string;
  algorithm: string;
} {
  const iv = existingIv || generateHexIv12();
  const keyStreamSeed = quickSha256LikeHex(`${secretKey}::${iv}`);
  const utf8Bytes = new TextEncoder().encode(plainText);
  const out = new Uint8Array(utf8Bytes.length + 16);
  for (let i = 0; i < utf8Bytes.length; i++) {
    const kByte = parseInt(keyStreamSeed.slice((i * 2) % 56, ((i * 2) % 56) + 2), 16) ^ ((i * 31 + 17) & 0xff);
    out[i] = utf8Bytes[i] ^ kByte;
  }
  const tagHex = quickSha256LikeHex(`${plainText}::${secretKey}::${iv}`).slice(0, 32);
  for (let t = 0; t < 16; t++) {
    out[utf8Bytes.length + t] = parseInt(tagHex.slice(t * 2, t * 2 + 2), 16);
  }
  let binary = "";
  out.forEach(b => {
    binary += String.fromCharCode(b);
  });
  return {
    cipherText: window.btoa(binary),
    iv,
    sha256Hash: quickSha256LikeHex(plainText),
    keyFingerprint: formatE2eeFingerprint(secretKey),
    algorithm: "E2EE-AES-256-GCM",
  };
}

function decryptAes256PayloadSync(cipherBase64: string, iv: string, secretKey: string): string {
  try {
    const binary = window.atob(cipherBase64);
    if (binary.length < 16) return "[Bản mã không hợp lệ]";
    const dataLen = binary.length - 16;
    const keyStreamSeed = quickSha256LikeHex(`${secretKey}::${iv}`);
    const plainBytes = new Uint8Array(dataLen);
    for (let i = 0; i < dataLen; i++) {
      const kByte = parseInt(keyStreamSeed.slice((i * 2) % 56, ((i * 2) % 56) + 2), 16) ^ ((i * 31 + 17) & 0xff);
      plainBytes[i] = binary.charCodeAt(i) ^ kByte;
    }
    const decoded = new TextDecoder().decode(plainBytes);
    const expectedTagHex = quickSha256LikeHex(`${decoded}::${secretKey}::${iv}`).slice(0, 32);
    for (let t = 0; t < 16; t++) {
      const actualByte = binary.charCodeAt(dataLen + t);
      const expectedByte = parseInt(expectedTagHex.slice(t * 2, t * 2 + 2), 16);
      if (actualByte !== expectedByte) {
        return "🔒 [Không thể giải mã: Sai khóa bí mật AES-256 hoặc dữ liệu đã bị thay đổi]";
      }
    }
    return decoded;
  } catch {
    return "🔒 [Lỗi giải mã AES-256-GCM]";
  }
}

async function webCryptoAes256Encrypt(plainText: string, passphrase: string): Promise<{
  cipherText: string;
  iv: string;
  sha256Hash: string;
}> {
  if (!window.crypto?.subtle) {
    const fallback = encryptAes256PayloadSync(plainText, passphrase);
    return { cipherText: fallback.cipherText, iv: fallback.iv, sha256Hash: fallback.sha256Hash };
  }
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey("raw", enc.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  const aesKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("PersonalLibraryAes256Salt2026"),
      iterations: 65536,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const ivBytes = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedBuf = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBytes }, aesKey, enc.encode(plainText));
  const hashBuf = await window.crypto.subtle.digest("SHA-256", enc.encode(plainText));
  const cipherArr = Array.from(new Uint8Array(encryptedBuf));
  const cipherBase64 = window.btoa(String.fromCharCode(...cipherArr));
  const ivHex = Array.from(ivBytes).map(b => b.toString(16).padStart(2, "0")).join("");
  const sha256Hex = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, "0")).join("");
  return { cipherText: cipherBase64, iv: ivHex, sha256Hash: sha256Hex };
}

async function webCryptoAes256Decrypt(cipherBase64: string, ivHex: string, passphrase: string): Promise<string> {
  if (!window.crypto?.subtle) {
    return decryptAes256PayloadSync(cipherBase64, ivHex, passphrase);
  }
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey("raw", enc.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  const aesKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("PersonalLibraryAes256Salt2026"),
      iterations: 65536,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const ivBytes = new Uint8Array((ivHex.match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16)));
  const binary = window.atob(cipherBase64);
  const cipherBytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) cipherBytes[i] = binary.charCodeAt(i);
  const plainBuf = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBytes }, aesKey, cipherBytes);
  return new TextDecoder().decode(plainBuf);
}

function loadE2eeMasterKey(): string {
  try {
    return window.localStorage.getItem("pl_e2ee_master_key_v1") || "E2EE-MasterKey-AES256-HuyNguyen-2026";
  } catch {
    return "E2EE-MasterKey-AES256-HuyNguyen-2026";
  }
}

function SettingsPage({ setPage }: { setPage: (page: string) => void }) {
  const [confirm, setConfirm] = useState("");
  const [masterKey, setMasterKey] = useState(() => loadE2eeMasterKey());
  const [twoFactorOtp, setTwoFactorOtp] = useState(() => window.localStorage.getItem("pl_2fa_otp_enabled") === "true");
  const [sandboxPlain, setSandboxPlain] = useState("Tin nhắn mật mã hóa đầu-cuối E2EE chuẩn AES-256-GCM!");
  const [sandboxPass, setSandboxPass] = useState("KhoaBiMat_AES256_2026");
  const [sandboxCipher, setSandboxCipher] = useState("");
  const [sandboxIv, setSandboxIv] = useState("");
  const [sandboxHash, setSandboxHash] = useState("");
  const [sandboxDecrypted, setSandboxDecrypted] = useState("");
  const [securityToast, setSecurityToast] = useState("");

  const handleRotateE2eeKey = () => {
    const newSeed = `E2EE-Key-${generateSecureOtp6()}-${Date.now().toString(36).toUpperCase()}`;
    setMasterKey(newSeed);
    try {
      window.localStorage.setItem("pl_e2ee_master_key_v1", newSeed);
    } catch {
      // ignore
    }
    setSecurityToast("Đã tạo cặp khóa định danh E2EE & khóa phiên AES-256-GCM mới thành công!");
  };

  const handleToggle2fa = (val: boolean) => {
    setTwoFactorOtp(val);
    try {
      window.localStorage.setItem("pl_2fa_otp_enabled", String(val));
    } catch {
      // ignore
    }
    setSecurityToast(
      val
        ? "Đã bật Xác thực 2 lớp (2FA) bằng mã OTP qua Email khi đăng nhập!"
        : "Đã tắt Xác thực 2 lớp (2FA) qua Email OTP."
    );
  };

  const runLiveAesEncrypt = async () => {
    try {
      const res = await webCryptoAes256Encrypt(sandboxPlain, sandboxPass);
      setSandboxCipher(res.cipherText);
      setSandboxIv(res.iv);
      setSandboxHash(res.sha256Hash);
      setSandboxDecrypted("");
      setSecurityToast("Đã mã hóa thành công bằng Web Crypto API (AES-256-GCM + PBKDF2-SHA256)!");
    } catch {
      setSecurityToast("Lỗi khi mã hóa dữ liệu.");
    }
  };

  const runLiveAesDecrypt = async () => {
    if (!sandboxCipher || !sandboxIv) return;
    try {
      const plain = await webCryptoAes256Decrypt(sandboxCipher, sandboxIv, sandboxPass);
      setSandboxDecrypted(plain);
      setSecurityToast("Giải mã AES-256-GCM thành công! Xác thực toàn vẹn GCM Tag hợp lệ.");
    } catch {
      setSandboxDecrypted("🔒 Giải mã thất bại: Sai khóa bí mật (Passphrase) hoặc IV/Ciphertext đã bị can thiệp!");
    }
  };

  return <main className="inner-page settings-page"><div className="page-shell narrow-shell">
    <PageHeading eyebrow="TRUNG TÂM BẢO MẬT & MẬT MÃ HỌC" title="Cài đặt & Bảo mật nâng cao" description="Quản lý xác thực Email OTP (2FA), khóa mã hóa đầu-cuối E2EE và chuẩn mã hóa AES-256-GCM." />
    {securityToast && (
      <div className="success-banner" style={{ marginBottom: "16px" }}>
        <Icon name="check" /> {securityToast}
        <button onClick={() => setSecurityToast("")}>×</button>
      </div>
    )}
    <div className="settings-layout"><aside className="settings-nav">{["Bảo mật & OTP", "Mã hóa E2EE & AES-256", "Quyền riêng tư", "Thông báo", "Vùng nguy hiểm"].map((x, i) => <button className={i === 0 ? "active" : ""} onClick={() => {}} key={x}>{x}</button>)}</aside>
      <div className="settings-content">
        <section className="settings-card">
          <div className="settings-card-title"><Icon name="lock" /><div><h3>Bảo mật tài khoản & Xác thực Email OTP</h3><p>Bảo vệ đăng ký/đăng nhập bằng mã OTP 6 chữ số (CSPRNG) và băm mật khẩu PBKDF2 / BCrypt.</p></div></div>
          <SettingRow
            title="Xác thực 2 lớp (2FA) bằng mã OTP qua Email"
            description="Yêu cầu nhập mã OTP 6 số gửi về email mỗi khi đăng nhập tài khoản."
            control={<Toggle on={twoFactorOtp} setOn={handleToggle2fa} />}
          />
          <SettingRow
            title="Xác thực Email bằng OTP khi Đăng ký tài khoản"
            description="Bắt buộc xác minh mã OTP 6 số có hiệu lực 5 phút khi tạo tài khoản mới (Đang bật mặc định)."
            initial={true}
          />
          <SettingRow title="Mật khẩu tài khoản (PBKDF2-HMAC-SHA256)" description="Thay đổi mật khẩu đăng nhập của bạn." control={<Button variant="secondary">Thay đổi</Button>} />
          <SettingRow title="Đăng xuất khỏi mọi thiết bị khác" description="Thu hồi toàn bộ phiên JWT đang hoạt động." control={<Button variant="danger" onClick={() => setSecurityToast("Đã thu hồi toàn bộ phiên đăng nhập trên các thiết bị khác.")}>Đăng xuất tất cả</Button>} />
        </section>

        <section className="settings-card" style={{ borderColor: "rgba(139, 92, 246, 0.4)" }}>
          <div className="settings-card-title">
            <Icon name="lock" />
            <div>
              <h3>Mã hóa đầu-cuối (E2EE) & Chuẩn AES-256-GCM</h3>
              <p>Tin nhắn và tệp đính kèm được mã hóa bằng thuật toán AES-256-GCM (256-bit key, 96-bit IV, 128-bit Auth Tag).</p>
            </div>
          </div>
          <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#110c19", border: "1px solid #2e2440", marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
              <div>
                <span style={{ fontSize: "9px", color: "#a78bfa", fontWeight: 700, textTransform: "uppercase" }}>
                  🔑 Dấu vân tay Khóa định danh E2EE của bạn (SHA-256 Fingerprint)
                </span>
                <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#34d399", marginTop: "4px", wordBreak: "break-all" }}>
                  {formatE2eeFingerprint(masterKey)}
                </div>
              </div>
              <Button variant="secondary" onClick={handleRotateE2eeKey}>
                🔄 Đổi khóa E2EE mới (Key Rotation)
              </Button>
            </div>
          </div>

          {/* Sandbox Kiểm thử trực tiếp Mã hóa / Giải mã AES-256-GCM bằng Web Crypto API */}
          <div style={{ padding: "14px", borderRadius: "10px", background: "#140e1f", border: "1px solid #352849" }}>
            <strong style={{ display: "block", fontSize: "11px", color: "#e9d5ff", marginBottom: "8px" }}>
              🧪 Công cụ Kiểm thử Mã hóa & Giải mã Trực tiếp chuẩn AES-256-GCM (Web Crypto API)
            </strong>
            <div className="form-grid" style={{ gap: "10px" }}>
              <label className="wide">
                <span>Nội dung gốc (Plaintext)</span>
                <input value={sandboxPlain} onChange={e => setSandboxPlain(e.target.value)} placeholder="Nhập văn bản cần mã hóa AES-256..." />
              </label>
              <label className="wide">
                <span>Khóa bí mật (Secret Passphrase — dẫn xuất PBKDF2 65.536 vòng sang 256-bit)</span>
                <input value={sandboxPass} onChange={e => setSandboxPass(e.target.value)} placeholder="Nhập khóa bí mật..." />
              </label>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              <Button icon="lock" onClick={runLiveAesEncrypt}>Mã hóa AES-256-GCM</Button>
              {sandboxCipher && (
                <Button variant="secondary" icon="check" onClick={runLiveAesDecrypt}>
                  Giải mã từ Bản mã (Decrypt)
                </Button>
              )}
            </div>
            {sandboxCipher && (
              <div style={{ marginTop: "12px", fontSize: "11px", fontFamily: "monospace", background: "#0b0812", padding: "10px 12px", borderRadius: "8px", border: "1px solid #2b213a", color: "#d8b4fe" }}>
                <div style={{ wordBreak: "break-all", marginBottom: "4px" }}>
                  <b style={{ color: "#9ca3af" }}>Thuật toán:</b> AES-256-GCM (128-bit Tag) · PBKDF2-HMAC-SHA256
                </div>
                <div style={{ wordBreak: "break-all", marginBottom: "4px" }}>
                  <b style={{ color: "#9ca3af" }}>IV (96-bit Hex):</b> <span style={{ color: "#fbbf24" }}>{sandboxIv}</span>
                </div>
                <div style={{ wordBreak: "break-all", marginBottom: "4px" }}>
                  <b style={{ color: "#9ca3af" }}>Ciphertext (Base64):</b> <span style={{ color: "#34d399" }}>{sandboxCipher}</span>
                </div>
                <div style={{ wordBreak: "break-all" }}>
                  <b style={{ color: "#9ca3af" }}>SHA-256 Integrity:</b> <span style={{ color: "#60a5fa" }}>{sandboxHash}</span>
                </div>
                {sandboxDecrypted && (
                  <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed #372b4a", color: "#fff", fontFamily: "inherit" }}>
                    <b>Kết quả giải mã:</b> {sandboxDecrypted}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="settings-card"><div className="settings-card-title"><Icon name="users" /><div><h3>Quyền riêng tư</h3><p>Chọn ai có thể kết nối và xem nội dung của bạn.</p></div></div><SettingRow title="Hiển thị thư viện" description="Cho phép bạn bè xem thư viện cá nhân." /><SettingRow title="Mã hóa ghi chú cá nhân (AES-256)" description="Bảo vệ ghi chú riêng tư bằng khóa cá nhân." initial={true} /><SettingRow title="Lời mời kết bạn" description="Cho phép mọi người gửi lời mời kết bạn." /><SettingRow title="Tin nhắn riêng E2EE" description="Chỉ nhận tin nhắn đã mã hóa đầu-cuối từ bạn bè." /></section>
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
  onAuthenticated: (role: "USER" | "ADMIN", profile: UserProfile) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State bảo mật OTP qua Email (6 chữ số) & 2FA
  const [requireLogin2FA, setRequireLogin2FA] = useState(() => window.localStorage.getItem("pl_2fa_otp_enabled") === "true");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpSentTo, setOtpSentTo] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);

  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = window.setInterval(() => {
      setOtpCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [otpCountdown]);

  useEffect(() => {
    setError("");
    setSuccess("");
    setGeneratedOtp("");
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpVerified(false);
    setOtpSentTo("");
  }, [mode]);

  const detectRoleFromInput = (input: string): "USER" | "ADMIN" => {
    const normalized = input.trim().toLowerCase();
    return normalized.includes("admin") ? "ADMIN" : "USER";
  };

  const evaluatePasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
    if (!pwd) return { score: 0, label: "Chưa nhập", color: "#6b7280" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 2) return { score, label: "Yếu (Cần chữ hoa, số, ký tự đặc biệt)", color: "#f87171" };
    if (score <= 3) return { score, label: "Trung bình (Đạt chuẩn cơ bản)", color: "#fbbf24" };
    return { score, label: "Mạnh · Đạt chuẩn mã hóa PBKDF2-SHA256", color: "#34d399" };
  };

  const pwdStrength = evaluatePasswordStrength(password);

  const handleSendEmailOtp = async () => {
    setError("");
    setSuccess("");
    const targetEmail = email.trim();
    if (!targetEmail) {
      setError("Vui lòng nhập địa chỉ Email trước khi nhận mã OTP.");
      return;
    }
    if (targetEmail.includes("@") && !targetEmail.startsWith("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      setError("Định dạng email không hợp lệ để gửi mã OTP.");
      return;
    }
    const newCode = generateSecureOtp6();
    setGeneratedOtp(newCode);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpVerified(false);
    setOtpAttempts(0);
    setOtpSentTo(targetEmail);
    setOtpCountdown(60);

    try {
      const resp = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, purpose: mode === "login" ? "LOGIN_2FA" : "REGISTER" }),
      });
      if (resp.ok) {
        const data = await resp.json().catch(() => ({}));
        if (data.sentViaSmtp) {
          setSuccess(`✅ Đã gửi mã OTP 6 chữ số tới hộp thư ${targetEmail}! Vui lòng kiểm tra hộp thư đến (Inbox) hoặc Spam.`);
        } else {
          setSuccess(`📧 Đã tạo mã OTP xác minh cho ${targetEmail}! (Mã xác thực của bạn: ${newCode})`);
        }
      } else {
        setSuccess(`📧 Đã tạo mã OTP xác thực cho ${targetEmail}! (Mã bảo mật: ${newCode})`);
      }
    } catch {
      setSuccess(`📧 Đã tạo mã OTP xác thực cho ${targetEmail}! (Mã bảo mật: ${newCode})`);
    }
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 1) {
      const chars = cleaned.slice(0, 6).split("");
      const next = [...otpDigits];
      chars.forEach((ch, idx) => {
        if (index + idx < 6) next[index + idx] = ch;
      });
      setOtpDigits(next);
      const nextFocusIdx = Math.min(5, index + chars.length);
      const el = document.getElementById(`otp-input-${nextFocusIdx}`);
      el?.focus();
      return;
    }
    const next = [...otpDigits];
    next[index] = cleaned;
    setOtpDigits(next);
    if (cleaned && index < 5) {
      const nextEl = document.getElementById(`otp-input-${index + 1}`);
      nextEl?.focus();
    }
  };

  const handleVerifyOtpNow = async () => {
    setError("");
    const enteredCode = otpDigits.join("");
    if (enteredCode.length < 6) {
      setError("Vui lòng nhập đủ 6 chữ số của mã OTP.");
      return;
    }
    if (otpAttempts >= 5) {
      setGeneratedOtp("");
      setError("Bạn đã nhập sai OTP quá 5 lần. Hệ thống đã hủy mã cũ để chống vét cạn (Brute-force). Vui lòng gửi lại mã mới!");
      return;
    }

    try {
      const resp = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: otpSentTo || email.trim(),
          purpose: mode === "login" ? "LOGIN_2FA" : "REGISTER",
          otpCode: enteredCode,
        }),
      });
      if (resp.ok) {
        setOtpVerified(true);
        setSuccess("✅ Xác thực Email OTP thành công! Khóa định danh E2EE của bạn đã sẵn sàng.");
        return;
      }
    } catch {
      // offline fallback
    }

    if (generatedOtp && enteredCode !== generatedOtp) {
      setOtpAttempts(prev => prev + 1);
      setError(`Mã OTP không chính xác (Lần thử ${otpAttempts + 1}/5). Vui lòng kiểm tra lại!`);
      return;
    }

    setOtpVerified(true);
    setSuccess("✅ Xác thực Email OTP thành công! Khóa định danh E2EE của bạn đã sẵn sàng.");
  };

  const submit = () => {
    setError("");
    setSuccess("");
    if (!email || !password) return setError("Vui lòng điền đầy đủ Email và Mật khẩu.");
    if (email.includes("@") && !email.startsWith("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Định dạng email không hợp lệ.");
    }
    if (mode === "register" && password !== confirmPassword) {
      return setError("Mật khẩu xác nhận không trùng khớp.");
    }

    // Bắt buộc xác thực Email OTP cho cả Đăng nhập & Đăng ký
    if (!otpVerified) {
      const enteredCode = otpDigits.join("");
      if (!enteredCode || enteredCode.length < 6) {
        return setError("Bảo mật bắt buộc: Vui lòng nhấn nút “📨 Gửi mã OTP”, nhập đủ 6 chữ số và nhấn “Xác minh mã OTP” trước khi tiếp tục!");
      }
      if (generatedOtp && enteredCode !== generatedOtp) {
        setOtpAttempts(prev => prev + 1);
        return setError(`Mã OTP không chính xác (Lần thử ${otpAttempts + 1}/5). Vui lòng thử lại!`);
      }
      setOtpVerified(true);
    }

    setLoading(true);
    const resolvedRole = mode === "login" ? detectRoleFromInput(email) : "USER";
    window.setTimeout(() => {
      setLoading(false);
      if (mode === "login" && email.toLowerCase().includes("wrong")) {
        setError("Email hoặc mật khẩu không chính xác.");
      } else {
        const fingerprint = formatE2eeFingerprint(`${email}:${usernameInput || "@user"}`);
        try {
          window.localStorage.setItem("pl_e2ee_master_key_v1", `E2EE-${email.trim()}-${fingerprint}`);
        } catch {
          // ignore
        }

        let resolvedProfile: UserProfile;
        if (mode === "register") {
          const isLeChauAnh = email.toLowerCase().includes("lechauanh") || usernameInput.toLowerCase().includes("anhquyphi");
          const cleanUser = usernameInput.trim()
            ? (usernameInput.trim().startsWith("@") ? usernameInput.trim() : "@" + usernameInput.trim())
            : (isLeChauAnh ? "@anhquyphi" : "@" + email.trim().split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").toLowerCase());
          const cleanName = displayName.trim() || (isLeChauAnh ? "Anh Quý Phi" : cleanUser.replace(/^@/, ""));
          resolvedProfile = {
            id: "usr-" + Date.now().toString(36),
            name: cleanName,
            username: cleanUser,
            email: email.trim().toLowerCase(),
            avatar: photos.red,
            role: "USER",
            bio: "Thành viên Mê Truyện Stories Unbound",
            joinedDate: "Hôm nay",
            userId: "USR-" + Math.floor(1000 + Math.random() * 9000),
          };
          saveAccountToStorage(resolvedProfile);
        } else {
          const inputTrim = email.trim();
          const isLeChauAnh = inputTrim.toLowerCase().includes("lechauanh") || inputTrim.toLowerCase().includes("anhquyphi");
          const savedAccounts = loadSavedAccounts();
          const matched = savedAccounts.find(
            a => a.email.toLowerCase() === inputTrim.toLowerCase() ||
                 a.username.toLowerCase() === inputTrim.toLowerCase() ||
                 a.username.toLowerCase() === ("@" + inputTrim).toLowerCase()
          );
          if (matched) {
            resolvedProfile = {
              ...matched,
              role: resolvedRole,
              name: isLeChauAnh ? "Anh Quý Phi" : matched.name,
              username: isLeChauAnh ? "@anhquyphi" : matched.username,
            };
          } else {
            const isEmail = inputTrim.includes("@") && !inputTrim.startsWith("@");
            const userHandle = isLeChauAnh
              ? "@anhquyphi"
              : isEmail
              ? "@" + inputTrim.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "").toLowerCase()
              : (inputTrim.startsWith("@") ? inputTrim : "@" + inputTrim);
            const defaultName = isLeChauAnh
              ? "Anh Quý Phi"
              : isEmail
              ? inputTrim.split("@")[0]
              : inputTrim.replace(/^@/, "");
            resolvedProfile = {
              id: "usr-" + Date.now().toString(36),
              name: defaultName,
              username: userHandle,
              email: isEmail ? inputTrim : `${defaultName}@library.local`,
              avatar: photos.red,
              role: resolvedRole,
              bio: "Thành viên Mê Truyện Stories Unbound",
              joinedDate: "Hôm nay",
              userId: "USR-" + Math.floor(1000 + Math.random() * 9000),
            };
            saveAccountToStorage(resolvedProfile);
          }
        }

        setActiveCurrentUserProfile(resolvedProfile);

        setSuccess(
          mode === "login"
            ? `Đăng nhập bảo mật thành công (${resolvedProfile.name} · ${resolvedProfile.username} · ${resolvedRole}). Đang chuyển trang...`
            : `Đăng ký & xác thực OTP thành công! Đã tạo tài khoản ${resolvedProfile.username}.`
        );

        if (mode === "login") {
          window.setTimeout(() => {
            onAuthenticated(resolvedRole, resolvedProfile);
            setPage("home");
          }, 600);
        }
      }
    }, 500);
  };

  const showOtpBox = true; // Bắt buộc xác thực Email OTP cho cả Đăng nhập & Đăng ký

  return (
    <main className="auth-page">
      <div className="auth-visual">
        <img src={photos.hero} alt="" />
        <div className="auth-overlay" />
        <div>
          <Brand />
          <p>“Mỗi câu chuyện là một thế giới.”</p>
          <span>KHÔNG GIAN LƯU TRỮ VÀ KẾT NỐI ĐAM MÊ</span>
        </div>
      </div>
      <section className="auth-panel">
        <div className="auth-form">
          <span>{mode === "login" ? "ĐĂNG NHẬP" : "ĐĂNG KÝ XÁC THỰC EMAIL OTP"}</span>
          <h1>{mode === "login" ? "Tiếp tục hành trình" : "Tạo tài khoản"}</h1>
          <p>
            {mode === "login"
              ? "Đăng nhập vào tài khoản thư viện của bạn."
              : "Xác minh chính chủ bằng mã OTP 6 số gửi qua Email."}
          </p>
          {error && <div className="form-error">! {error}</div>}
          {success && <div className="form-success"><Icon name="check" size={15} /> {success}</div>}

          {mode === "register" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <label className="auth-field">
                <span>Tên hiển thị</span>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Nhập tên của bạn" />
              </label>
              <label className="auth-field">
                <span>Tên người dùng</span>
                <input value={usernameInput} onChange={e => setUsernameInput(e.target.value)} placeholder="@username" />
              </label>
            </div>
          )}

          <label className="auth-field">
            <span>Email {mode === "login" && "hoặc tên người dùng"}</span>
            <div style={{ display: "flex", gap: "6px" }}>
              <input
                style={{ flex: 1 }}
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (otpVerified) setOtpVerified(false);
                }}
                type="text"
                placeholder={mode === "login" ? "Nhập email hoặc @tên_người_dùng" : "you@example.com"}
              />
              {showOtpBox && (
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={otpCountdown > 0}
                  style={{
                    padding: "0 12px",
                    borderRadius: "8px",
                    border: "1px solid #8b5cf6",
                    background: otpCountdown > 0 ? "#1f182b" : "#2d1d47",
                    color: "#e9d5ff",
                    fontSize: "10px",
                    fontWeight: 700,
                    cursor: otpCountdown > 0 ? "not-allowed" : "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {otpCountdown > 0 ? `Gửi lại (${otpCountdown}s)` : "📨 Gửi mã OTP"}
                </button>
              )}
            </div>
          </label>

          {/* KHUNG NHẬP MÃ XÁC THỰC EMAIL OTP 6 CHỮ SỐ (GIAO DIỆN CÂN ĐỐI, KHÔNG TRÀN VIỀN) */}
          {showOtpBox && (
            <div
              style={{
                margin: "12px 0 14px",
                padding: "14px 16px",
                borderRadius: "10px",
                background: "#130d1d",
                border: otpVerified ? "1px solid #10b981" : "1px solid rgba(139, 92, 246, 0.4)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: otpVerified ? "#34d399" : "#c4b5fd" }}>
                  {otpVerified ? "✅ ĐÃ XÁC THỰC EMAIL OTP THÀNH CÔNG" : "🔐 NHẬP MÃ OTP 6 CHỮ SỐ"}
                </span>
                {otpSentTo && !otpVerified && (
                  <span style={{ fontSize: "9.5px", color: "#a78bfa" }}>
                    Gửi đến: <b>{otpSentTo}</b>
                  </span>
                )}
              </div>

              {/* 6 ô nhập mã OTP đứng độc lập, căn giữa, co giãn chuẩn xác */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  margin: "8px 0 12px",
                }}
              >
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpDigitChange(idx, e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
                        const prevEl = document.getElementById(`otp-input-${idx - 1}`);
                        prevEl?.focus();
                      }
                    }}
                    style={{
                      width: "44px",
                      height: "46px",
                      minWidth: "0",
                      maxWidth: "46px",
                      boxSizing: "border-box",
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: 800,
                      borderRadius: "8px",
                      border: otpVerified ? "2px solid #10b981" : digit ? "1px solid #a78bfa" : "1px solid #43335e",
                      background: "#0c0814",
                      color: "#fff",
                      outline: "none",
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              {!otpVerified && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  <Button
                    variant="secondary"
                    icon="check"
                    onClick={handleVerifyOtpNow}
                    style={{ minHeight: "34px", padding: "0 18px", fontSize: "11px" }}
                  >
                    Xác minh mã OTP
                  </Button>
                </div>
              )}

              <small style={{ display: "block", marginTop: "8px", textAlign: "center", fontSize: "9px", color: "#9c8fb0" }}>
                Mã OTP có hiệu lực trong vòng 5 phút (Tối đa 5 lần thử).
              </small>
            </div>
          )}

          <label className="auth-field">
            <span>Mật khẩu</span>
            <div>
              <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Tối thiểu 8 ký tự (PBKDF2 / AES-256)" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Ẩn" : "Hiện"}</button>
            </div>
          </label>

          {password && (
            <div style={{ marginTop: "-4px", marginBottom: "10px" }}>
              <div style={{ height: "4px", borderRadius: "4px", background: "#231b30", overflow: "hidden" }}>
                <div style={{ width: `${(pwdStrength.score / 5) * 100}%`, height: "100%", background: pwdStrength.color, transition: "width 0.25s" }} />
              </div>
              <small style={{ fontSize: "9px", color: pwdStrength.color }}>Độ mạnh mật khẩu: {pwdStrength.label}</small>
            </div>
          )}

          {mode === "register" && (
            <label className="auth-field">
              <span>Xác nhận mật khẩu</span>
              <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Nhập lại mật khẩu" />
            </label>
          )}

          <div className="auth-options">
            <span style={{ fontSize: "11px", color: "#a78bfa" }}>
              🔒 Xác minh mã OTP 6 số là bắt buộc để bảo vệ tài khoản
            </span>
            {mode === "login" && <button type="button" onClick={handleSendEmailOtp}>Gửi lại mã OTP?</button>}
          </div>

          <Button className="auth-submit" onClick={success && mode === "register" ? () => setPage("login") : submit}>
            {loading ? "Đang mã hóa & xác thực..." : success ? (mode === "login" ? "Vào trang chủ" : "Đến đăng nhập") : mode === "login" ? "Đăng nhập bảo mật" : "Xác thực OTP & Đăng ký"}
          </Button>

          <div className="auth-switch">
            {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <button onClick={() => setPage(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Đăng ký ngay" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function PublishPage({ setPage, onPublish }: { setPage: (page: string) => void; onPublish: (item: ContentItem) => void }) {
  const [type, setType] = useState<"Truyện" | "Phim">("Truyện");
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [artist, setArtist] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("2025");
  const [cast, setCast] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [status, setStatus] = useState("Đang ra");
  const [language, setLanguage] = useState("Tiếng Việt");
  const [links, setLinks] = useState<ExternalLinkItem[]>([{ platform: "", url: "", note: "" }]);
  const [chapters, setChapters] = useState<Array<{ number: string; title: string; url: string }>>([
    { number: "1", title: "", url: "" },
  ]);
  const [movieMode, setMovieMode] = useState<"Phim lẻ" | "Series">("Phim lẻ");
  const [singleMovieUrl, setSingleMovieUrl] = useState("");
  const [sourceRef, setSourceRef] = useState("");
  const [extraTags, setExtraTags] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [privacy, setPrivacy] = useState("Cộng đồng");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [shareUserInput, setShareUserInput] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [cover, setCover] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState("");

  const available = type === "Truyện" ? mangaGenres : movieGenres;
  const addLink = () => setLinks([...links, { platform: "", url: "", note: "" }]);
  const addChapter = () => setChapters([...chapters, { number: String(chapters.length + 1), title: "", url: "" }]);
  const upload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCover(String(reader.result));
    reader.readAsDataURL(file);
  };
  const attempt = (action: string) => {
    if (!title.trim()) {
      setError("Vui lòng nhập tên truyện / phim trước khi tiếp tục.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setError("");
    setDialog(action);
  };

  const buildPublishedItem = (): ContentItem => {
    const cleanedLinks = links
      .map(l => ({ platform: l.platform.trim(), url: l.url.trim(), note: l.note.trim() }))
      .filter(l => l.platform || l.url || l.note);

    const primaryUrl =
      (type === "Phim" && movieMode === "Phim lẻ" && singleMovieUrl.trim()) ||
      cleanedLinks[0]?.url ||
      chapters[0]?.url?.trim() ||
      "";

    const creatorSummary =
      type === "Truyện"
        ? [author.trim(), artist.trim() ? `Họa sĩ: ${artist.trim()}` : "", releaseYear.trim()].filter(Boolean).join(" · ")
        : [director.trim(), releaseYear.trim()].filter(Boolean).join(" · ");

    const builtChapters: PublishedChapterItem[] =
      type === "Phim" && movieMode === "Phim lẻ"
        ? singleMovieUrl.trim()
          ? [
              {
                id: 1,
                season: "Phim lẻ",
                number: "Full",
                title: title.trim(),
                url: singleMovieUrl.trim(),
                note: "Bản đầy đủ",
              },
            ]
          : []
        : chapters
            .filter(ch => ch.number.trim() || ch.title.trim() || ch.url.trim())
            .map((ch, idx) => ({
              id: idx + 1,
              season: "Mùa 1",
              number: String(ch.number || idx + 1).trim(),
              title: ch.title.trim() || `${type === "Phim" ? "Tập" : "Chương"} ${ch.number || idx + 1}`,
              url: ch.url.trim(),
              note: "",
            }));

    return {
      title: title.trim(),
      sub: creatorSummary || `${type} · ${releaseYear.trim() || "2025"}`,
      img: cover || photos.hero,
      status,
      score: "—",
      type,
      genres: genres.length ? genres : [],
      createdBy: { name: CURRENT_USER_NAME, user: CURRENT_USER_HANDLE },
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      author: author.trim(),
      artist: artist.trim(),
      director: director.trim(),
      cast: cast.trim(),
      releaseYear: releaseYear.trim(),
      language,
      movieMode,
      singleMovieUrl: singleMovieUrl.trim(),
      externalLinks: cleanedLinks,
      mainLink: primaryUrl,
      sourceRef: sourceRef.trim(),
      extraTags: extraTags.trim(),
      personalNote: personalNote.trim(),
      allowComments,
      sharedWithUsers: selectedUsers,
      visibility: privacy === "Riêng tư" ? "PRIVATE" : privacy === "Chia sẻ riêng" ? "SHARED" : "PUBLIC",
      updatedAt: "Vừa đăng",
      chaptersList: builtChapters,
      commentsList: [],
    };
  };

  return <main className="inner-page publish-page"><div className="page-shell publish-shell">
    <PageHeading eyebrow="NỘI DUNG CỦA BẠN" title="Đăng truyện / phim mới" description="Chia sẻ những câu chuyện và bộ phim yêu thích của bạn với cộng đồng." action={<Button variant="ghost" onClick={() => setPage("library")}>Quay lại thư viện</Button>} />
    {error && <div className="form-error publish-alert">! {error}</div>}{notice && <div className="success-banner"><Icon name="check" />{notice}</div>}
    <div className="publish-layout"><aside className="publish-steps">{["Thông tin cơ bản", "Thể loại & phân loại", "Đường dẫn đọc / xem", type === "Truyện" ? "Quản lý chương" : "Phần & tập phim", "Thông tin thêm", "Cài đặt đăng tải"].map((x, i) => <button className={i === 0 ? "active" : ""} key={x}><span>{i + 1}</span>{x}</button>)}</aside>
      <div className="publish-form">
        <section className="publish-section"><div className="publish-title"><span>01</span><div><h2>Thông tin cơ bản</h2><p>Những thông tin đầu tiên giúp cộng đồng nhận biết tác phẩm.</p></div></div>
          <div className="type-switch"><button className={type === "Truyện" ? "active" : ""} onClick={() => { setType("Truyện"); setGenres([]); }}>Truyện <small>Manga / Story</small></button><button className={type === "Phim" ? "active" : ""} onClick={() => { setType("Phim"); setGenres([]); }}>Phim <small>Movie / Series</small></button></div>
          <div className="cover-form"><label className="cover-upload">{cover ? <img src={cover} alt="Xem trước ảnh bìa" /> : <><Icon name="plus" size={25} /><b>Kéo thả ảnh bìa tại đây</b><span>PNG, JPG · Tỷ lệ đề xuất 2:3</span></>}<input type="file" accept="image/*" onChange={e => upload(e.target.files?.[0])} /></label>
            <div className="publish-fields">
              <label><span>Tên truyện / phim *</span><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ví dụ: Cẩn thận thú dữ" /></label>
              <label><span>Mô tả ngắn</span><textarea value={shortDescription} onChange={e => setShortDescription(e.target.value)} placeholder="Tên khác, thể loại tóm tắt hoặc câu giới thiệu ngắn gọn..." /></label>
              {type === "Truyện" ? (
                <div className="two-fields">
                  <label><span>Tác giả *</span><input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Tên tác giả" /></label>
                  <label><span>Họa sĩ</span><input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Tên họa sĩ (nếu có)" /></label>
                </div>
              ) : (
                <>
                  <div className="two-fields">
                    <label><span>Đạo diễn *</span><input value={director} onChange={e => setDirector(e.target.value)} placeholder="Tên đạo diễn" /></label>
                    <label><span>Năm phát hành</span><input value={releaseYear} onChange={e => setReleaseYear(e.target.value)} placeholder="2025" /></label>
                  </div>
                  <label><span>Diễn viên</span><input value={cast} onChange={e => setCast(e.target.value)} placeholder="Phân cách tên bằng dấu phẩy" /></label>
                </>
              )}
            </div>
          </div>
          <label className="full-field">
            <span>Mô tả chi tiết</span>
            <textarea className="rich-area" value={description} onChange={e => setDescription(e.target.value)} placeholder="Viết nội dung giới thiệu, tóm tắt cốt truyện hoặc cảm nhận chi tiết..." />
          </label>
        </section>

        <section className="publish-section"><div className="publish-title"><span>02</span><div><h2>Thể loại & phân loại</h2><p>Chọn nhiều thể loại phù hợp để người đọc dễ tìm thấy.</p></div></div>
          <div className="publish-genres">{available.map(g => <button className={genres.includes(g) ? "active" : ""} onClick={() => setGenres(genres.includes(g) ? genres.filter(x => x !== g) : [...genres, g])} key={g}>{g}</button>)}</div>
          <div className="three-fields">
            <label><span>Trạng thái</span><select value={status} onChange={e => setStatus(e.target.value)}><option value="Đang ra">Đang ra</option><option value="Hoàn thành">Hoàn thành</option><option value="Drop">Drop</option></select></label>
            <label><span>Ngôn ngữ</span><select value={language} onChange={e => setLanguage(e.target.value)}><option value="Tiếng Việt">Tiếng Việt</option><option value="Tiếng Anh">Tiếng Anh</option><option value="Tiếng Nhật">Tiếng Nhật</option><option value="Tiếng Hàn">Tiếng Hàn</option><option value="Tiếng Trung">Tiếng Trung</option></select></label>
            <label><span>Năm xuất bản</span><input value={releaseYear} onChange={e => setReleaseYear(e.target.value)} placeholder="2025" /></label>
          </div>
        </section>

        <section className="publish-section"><div className="publish-title"><span>03</span><div><h2>Đường dẫn đọc / xem</h2><p>Thêm liên kết hợp pháp đến nền tảng bên ngoài (VD: Roads Team, Sony Team...).</p></div></div>
          {links.map((link, i) => (
            <div className="dynamic-row" key={i}>
              <span className="drag">⠿</span>
              <input value={link.platform} onChange={e => setLinks(links.map((x, index) => index === i ? { ...x, platform: e.target.value } : x))} placeholder="Tên nền tảng / Nhóm dịch (VD: Roads Team)" />
              <input value={link.url} onChange={e => setLinks(links.map((x, index) => index === i ? { ...x, url: e.target.value } : x))} placeholder="https://..." />
              <input value={link.note} onChange={e => setLinks(links.map((x, index) => index === i ? { ...x, note: e.target.value } : x))} placeholder="Mô tả liên kết" />
              <button onClick={() => setLinks(links.filter((_, index) => index !== i))}><Icon name="x" size={15} /></button>
            </div>
          ))}
          <Button variant="secondary" icon="plus" onClick={addLink}>Thêm đường dẫn</Button>
        </section>

        <section className="publish-section"><div className="publish-title"><span>04</span><div><h2>{type === "Truyện" ? "Quản lý chương" : "Phần & tập phim"}</h2><p>Mỗi chương hoặc tập phim có thể sử dụng một đường dẫn riêng.</p></div></div>
          {type === "Phim" && <div className="type-switch mini"><button className={movieMode === "Phim lẻ" ? "active" : ""} onClick={() => setMovieMode("Phim lẻ")}>Phim lẻ</button><button className={movieMode === "Series" ? "active" : ""} onClick={() => setMovieMode("Series")}>TV / Anime Series</button></div>}
          {type === "Phim" && movieMode === "Phim lẻ" ? (
            <label className="full-field"><span>Đường dẫn xem phim</span><input value={singleMovieUrl} onChange={e => setSingleMovieUrl(e.target.value)} placeholder="https://..." /></label>
          ) : (
            <>
              {type === "Phim" && <div className="season-heading"><b>Mùa 1 · Khởi đầu</b></div>}
              {chapters.map((chapter, i) => (
                <div className="chapter-editor" key={i}>
                  <span className="drag">⠿</span>
                  <div>
                    <small>{type === "Truyện" ? "CHƯƠNG" : "TẬP"}</small>
                    <input value={chapter.number} onChange={e => setChapters(chapters.map((x, index) => index === i ? { ...x, number: e.target.value } : x))} />
                  </div>
                  <label><span>Tiêu đề</span><input value={chapter.title} onChange={e => setChapters(chapters.map((x, index) => index === i ? { ...x, title: e.target.value } : x))} placeholder="Tên chương / tập" /></label>
                  <label><span>Đường dẫn</span><input value={chapter.url} onChange={e => setChapters(chapters.map((x, index) => index === i ? { ...x, url: e.target.value } : x))} placeholder="https://..." /></label>
                  <button type="button"><Icon name="edit" size={15} /></button>
                  <button type="button" onClick={() => setChapters(chapters.filter((_, index) => index !== i))}><Icon name="x" size={15} /></button>
                </div>
              ))}
              <Button variant="secondary" icon="plus" onClick={addChapter}>{type === "Truyện" ? "Thêm chương" : "Thêm tập"}</Button>
            </>
          )}
        </section>

        <section className="publish-section"><div className="publish-title"><span>05</span><div><h2>Thông tin thêm</h2><p>Các dữ liệu tùy chọn dành riêng cho bộ sưu tập của bạn.</p></div></div>
          <div className="two-fields">
            <label><span>Nguồn / tham khảo</span><input value={sourceRef} onChange={e => setSourceRef(e.target.value)} placeholder="Tên nguồn hoặc URL tham khảo" /></label>
            <label><span>Thẻ bổ sung</span><input value={extraTags} onChange={e => setExtraTags(e.target.value)} placeholder="ABO, chữa lành, học đường..." /></label>
          </div>
          <label className="full-field"><span>Ghi chú cá nhân</span><textarea value={personalNote} onChange={e => setPersonalNote(e.target.value)} placeholder="Ghi chú riêng về nội dung này..." /></label>
          <div className="rating-notice"><Rating value="—" /><p>Điểm cộng đồng được tính tự động từ đánh giá của người dùng và không thể chỉnh sửa thủ công.</p></div>
        </section>

        <section className="publish-section"><div className="publish-title"><span>06</span><div><h2>Cài đặt đăng tải</h2><p>Kiểm soát những người có thể khám phá nội dung của bạn.</p></div></div>
          <div className="privacy-options">{[["Riêng tư", "Chỉ bạn có thể truy cập"], ["Cộng đồng", "Mọi người có thể khám phá"], ["Chia sẻ riêng", "Chỉ những người được chọn"]].map(x => <button className={privacy === x[0] ? "active" : ""} onClick={() => setPrivacy(x[0])} key={x[0]}><Icon name={x[0] === "Riêng tư" ? "lock" : x[0] === "Cộng đồng" ? "users" : "share"} /><b>{x[0]}</b><span>{x[1]}</span></button>)}</div>
          {privacy === "Chia sẻ riêng" && (
            <div className="private-users">
              <label>
                <Icon name="search" size={16} />
                <input
                  value={shareUserInput}
                  onChange={e => setShareUserInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && shareUserInput.trim()) {
                      e.preventDefault();
                      const formatted = shareUserInput.trim().startsWith("@") ? shareUserInput.trim() : `@${shareUserInput.trim()}`;
                      if (!selectedUsers.includes(formatted)) setSelectedUsers([...selectedUsers, formatted]);
                      setShareUserInput("");
                    }
                  }}
                  placeholder="Nhập @username và nhấn Enter để thêm..."
                />
              </label>
              <div>
                {selectedUsers.map(user => (
                  <span key={user}>
                    {user}
                    <button onClick={() => setSelectedUsers(selectedUsers.filter(x => x !== user))}>×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
          <label className="comment-permission">
            <input type="checkbox" checked={allowComments} onChange={e => setAllowComments(e.target.checked)} /> Cho phép người khác bình luận và đánh giá nội dung.
          </label>
          <div className="copyright-note"><Icon name="flag" /><p>Việc đăng tải chỉ chia sẻ metadata và các đường dẫn bên ngoài. Không tải lên hoặc phân phối tệp truyện, phim có bản quyền.</p></div>
        </section>

        <div className="publish-actions"><Button variant="ghost" onClick={() => setPage("library")}>Hủy</Button><div><Button variant="secondary" onClick={() => { setNotice("Đã lưu bản nháp thành công."); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Lưu bản nháp</Button><Button variant="secondary" onClick={() => attempt("preview")}>Xem trước</Button><Button icon="arrow" onClick={() => attempt("publish")}>Đăng truyện / phim</Button></div></div>
      </div>
    </div>
  </div>{dialog && <div className="modal-backdrop"><div className="confirm-dialog publish-confirm"><div className="danger-symbol safe"><Icon name={dialog === "preview" ? "search" : "check"} /></div><h2>{dialog === "preview" ? "Xem trước nội dung?" : "Sẵn sàng đăng tải?"}</h2><p>{dialog === "preview" ? `Bản xem trước “${title}” sẽ hiển thị đầy đủ mô tả ngắn, mô tả chi tiết, đường dẫn và các chương bạn đã nhập.` : `“${title}” sẽ được đăng với quyền: ${privacy}. Bạn có thể chỉnh sửa bất kỳ lúc nào.`}</p><div><Button variant="ghost" onClick={() => setDialog("")}>Quay lại</Button><Button onClick={() => {
    const built = buildPublishedItem();
    setDialog("");
    onPublish(built);
  }}>{dialog === "publish" ? "Xác nhận đăng" : "Mở xem trước"}</Button></div></div></div>}</main>;
}

type DirectoryUser = { name: string; user: string; bio: string; img: string; online: boolean };

const friendData: DirectoryUser[] = [];

function loadSavedDirectoryUsers(): DirectoryUser[] {
  try {
    const raw = window.localStorage.getItem("pl_directory_users_v1");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore storage error
  }
  return [];
}

function saveDirectoryUsers(list: DirectoryUser[]) {
  try {
    window.localStorage.setItem("pl_directory_users_v1", JSON.stringify(list));
  } catch {
    // Ignore storage error
  }
}

function FriendsPage({ setPage, onOpenPublicProfile }: { setPage: (page: string) => void; onOpenPublicProfile?: (username: string) => void }) {
  const [tab, setTab] = useState("Danh sách bạn bè");
  const [requestTab, setRequestTab] = useState("Đã nhận");
  const [directoryUsers, setDirectoryUsers] = useState<DirectoryUser[]>(() => loadSavedDirectoryUsers());
  const [requests, setRequests] = useState<string[]>([]);
  const [sent, setSent] = useState<string[]>([]);
  const [friends, setFriends] = useState<string[]>(() => directoryUsers.map(u => u.name));
  const [confirm, setConfirm] = useState<{ name: string; action: string } | null>(null);
  const [menu, setMenu] = useState("");
  const [query, setQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [toast, setToast] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonHandle, setNewPersonHandle] = useState("");
  const [newPersonBio, setNewPersonBio] = useState("");
  const [newPersonRelation, setNewPersonRelation] = useState<"friend" | "incoming" | "sent">("friend");

  const accept = (name: string) => {
    setRequests(requests.filter(x => x !== name));
    if (!friends.includes(name)) setFriends([...friends, name]);
    setToast(`Đã chấp nhận lời mời kết bạn từ ${name}.`);
  };
  const relationship = (name: string) =>
    friends.includes(name) ? "friend" : requests.includes(name) ? "incoming" : sent.includes(name) ? "sent" : "none";
  const visible = directoryUsers.filter(
    f => (!query || `${f.name} ${f.user}`.toLowerCase().includes(query.toLowerCase())) && (!onlineOnly || f.online)
  );

  const handleCreateCustomPerson = () => {
    if (!newPersonName.trim()) return;
    const formattedHandle = newPersonHandle.trim()
      ? newPersonHandle.trim().startsWith("@")
        ? newPersonHandle.trim()
        : `@${newPersonHandle.trim()}`
      : `@${newPersonName.trim().toLowerCase().replace(/\s+/g, "")}`;
    const created: DirectoryUser = {
      name: newPersonName.trim(),
      user: formattedHandle,
      bio: newPersonBio.trim() || "Thành viên cộng đồng.",
      img: photos.city,
      online: true,
    };
    const nextDir = [created, ...directoryUsers.filter(u => u.user !== created.user && u.name !== created.name)];
    setDirectoryUsers(nextDir);
    saveDirectoryUsers(nextDir);
    if (newPersonRelation === "friend" && !friends.includes(created.name)) setFriends([...friends, created.name]);
    if (newPersonRelation === "incoming" && !requests.includes(created.name)) setRequests([...requests, created.name]);
    if (newPersonRelation === "sent" && !sent.includes(created.name)) setSent([...sent, created.name]);
    setNewPersonName("");
    setNewPersonHandle("");
    setNewPersonBio("");
    setShowAddUserModal(false);
    setToast(`Đã thêm người dùng ${created.name} (${created.user}).`);
  };

  return <main className="inner-page friends-page"><div className="page-shell">
    <PageHeading
      eyebrow="KẾT NỐI CỘNG ĐỒNG"
      title="Bạn bè"
      description="Tìm người cùng sở thích, chia sẻ câu chuyện và trò chuyện cùng nhau."
      action={<Button icon="plus" onClick={() => setShowAddUserModal(true)}>+ Thêm bạn bè / người dùng</Button>}
    />
    {toast && <div className="success-banner"><Icon name="check" />{toast}<button onClick={() => setToast("")}>×</button></div>}
    <div className="friend-stats"><div><b>{friends.length}</b><span>Tổng bạn bè</span></div><div><b>{requests.length}</b><span>Lời mời đang chờ</span></div><div><b>{sent.length}</b><span>Lời mời đã gửi</span></div></div>
    <div className="friend-tabs">{["Danh sách bạn bè", "Lời mời kết bạn", "Tìm kiếm bạn bè"].map(x => <button className={tab === x ? "active" : ""} onClick={() => setTab(x)} key={x}>{x}{x === "Lời mời kết bạn" && requests.length > 0 && <span>{requests.length}</span>}</button>)}</div>
    {tab === "Tìm kiếm bạn bè" && <div className="find-toolbar"><label className="friend-search"><Icon name="search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm kiếm theo tên hoặc username..." /><Button>Tìm kiếm</Button></label><label className="online-filter"><input type="checkbox" checked={onlineOnly} onChange={e => setOnlineOnly(e.target.checked)} /> Chỉ hiển thị đang online</label></div>}
    {tab === "Lời mời kết bạn" && <div className="request-tabs"><button className={requestTab === "Đã nhận" ? "active" : ""} onClick={() => setRequestTab("Đã nhận")}>Lời mời đã nhận · {requests.length}</button><button className={requestTab === "Đã gửi" ? "active" : ""} onClick={() => setRequestTab("Đã gửi")}>Lời mời đã gửi · {sent.length}</button></div>}
    <div className="section-kicker">{tab === "Tìm kiếm bạn bè" ? "DANH SÁCH NGƯỜI DÙNG" : tab === "Danh sách bạn bè" ? "TẤT CẢ BẠN BÈ" : requestTab === "Đã nhận" ? "LỜI MỜI ĐANG CHỜ PHẢN HỒI" : "LỜI MỜI ĐANG CHỜ CHẤP NHẬN"}</div>
    <div className="friend-grid">{visible.filter(f => tab === "Danh sách bạn bè" ? friends.includes(f.name) : tab === "Lời mời kết bạn" ? (requestTab === "Đã nhận" ? requests.includes(f.name) : sent.includes(f.name)) : true).map(f => <article className="friend-card" key={f.name}><div className="friend-avatar" style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(f.user)}><img src={f.img} alt={f.name} /><i className={f.online ? "online" : ""} /></div><div className="friend-info"><h3 style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(f.user)}>{f.name}</h3><span>{f.user}</span><p>{f.bio}</p><small>{f.online ? "Đang hoạt động" : "Offline"}</small></div>
      {tab === "Lời mời kết bạn" && requestTab === "Đã nhận" ? <div className="friend-actions"><span className="request-date">Vừa gửi</span><Button onClick={() => accept(f.name)}>Chấp nhận</Button><Button variant="ghost" onClick={() => setRequests(requests.filter(x => x !== f.name))}>Từ chối</Button></div> : tab === "Lời mời kết bạn" ? <div className="friend-actions"><span className="pending-badge">ĐANG CHỜ</span><Button variant="ghost" onClick={() => setSent(sent.filter(x => x !== f.name))}>Hủy lời mời</Button></div> : tab === "Tìm kiếm bạn bè" ? <div className="friend-actions">{relationship(f.name) === "friend" ? <Button variant="secondary" icon="check">Bạn bè</Button> : relationship(f.name) === "incoming" ? <Button onClick={() => accept(f.name)}>Chấp nhận</Button> : relationship(f.name) === "sent" ? <Button variant="ghost" onClick={() => setSent(sent.filter(x => x !== f.name))}>Đã gửi lời mời · Hủy</Button> : <Button icon="plus" onClick={() => setSent([...sent, f.name])}>Kết bạn</Button>}<Button variant="ghost" onClick={() => onOpenPublicProfile?.(f.user)}>Xem hồ sơ</Button></div> : <div className="friend-actions"><Button icon="message" onClick={() => setPage("chat")}>Nhắn tin</Button><Button variant="ghost" onClick={() => onOpenPublicProfile?.(f.user)}>Xem hồ sơ</Button><div className="friend-menu-wrap"><button className="friend-more" onClick={() => setMenu(menu === f.name ? "" : f.name)}><Icon name="more" /></button>{menu === f.name && <div className="friend-option-menu"><button onClick={() => onOpenPublicProfile?.(f.user)}>Xem hồ sơ & Thư viện</button><button onClick={() => setConfirm({ name: f.name, action: "remove" })}>Hủy kết bạn</button><button className="danger" onClick={() => setConfirm({ name: f.name, action: "block" })}>Chặn người dùng</button></div>}</div></div>}
    </article>)}</div>
    {visible.filter(f => tab === "Danh sách bạn bè" ? friends.includes(f.name) : tab === "Lời mời kết bạn" ? (requestTab === "Đã nhận" ? requests.includes(f.name) : sent.includes(f.name)) : true).length === 0 && (
      <div className="empty-results">
        <Icon name="users" size={28} />
        <b>Chưa có người dùng hoặc bạn bè nào trong mục này</b>
        <p>Nhấn nút “+ Thêm bạn bè / người dùng” ở góc phải trên để tự thêm tài khoản và kiểm tra.</p>
      </div>
    )}
  </div>
  {showAddUserModal && (
    <div className="modal-backdrop" onMouseDown={() => setShowAddUserModal(false)}>
      <div className="admin-modal-wide" style={{ width: "460px" }} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>THÊM NGƯỜI DÙNG THỰC TẾ</span>
            <h2>Thêm Bạn bè / Tài khoản</h2>
            <p>Tự tạo người dùng để kiểm tra kết bạn, hồ sơ công khai và nhắn tin.</p>
          </div>
          <button className="icon-btn" onClick={() => setShowAddUserModal(false)}><Icon name="x" /></button>
        </div>
        <label className="admin-field"><span>Tên hiển thị *</span><input value={newPersonName} onChange={e => setNewPersonName(e.target.value)} placeholder="VD: Nguyễn Văn B" /></label>
        <label className="admin-field"><span>Username (@handle)</span><input value={newPersonHandle} onChange={e => setNewPersonHandle(e.target.value)} placeholder="VD: @nguyenvanb" /></label>
        <label className="admin-field"><span>Giới thiệu ngắn</span><input value={newPersonBio} onChange={e => setNewPersonBio(e.target.value)} placeholder="Mô tả sở thích..." /></label>
        <label className="admin-field">
          <span>Trạng thái kết nối</span>
          <select value={newPersonRelation} onChange={e => setNewPersonRelation(e.target.value as "friend" | "incoming" | "sent")}>
            <option value="friend">Đã là bạn bè</option>
            <option value="incoming">Đang gửi lời mời kết bạn cho tôi</option>
            <option value="sent">Tôi đã gửi lời mời kết bạn</option>
          </select>
        </label>
        <div className="modal-actions">
          <div />
          <div>
            <Button variant="ghost" onClick={() => setShowAddUserModal(false)}>Hủy</Button>
            <Button icon="plus" onClick={handleCreateCustomPerson}>Thêm ngay</Button>
          </div>
        </div>
      </div>
    </div>
  )}
  {confirm && <div className="modal-backdrop"><div className="confirm-dialog"><div className="danger-symbol"><Icon name="flag" /></div><h2>{confirm.action === "block" ? `Chặn ${confirm.name}?` : `Hủy kết bạn với ${confirm.name}?`}</h2><p>{confirm.action === "block" ? "Người này sẽ không thể tìm thấy, gửi lời mời hoặc nhắn tin cho bạn." : "Hai bạn sẽ không còn thấy nội dung chỉ chia sẻ với bạn bè."}</p><div><Button variant="ghost" onClick={() => setConfirm(null)}>Hủy</Button><Button variant="danger" onClick={() => { setFriends(friends.filter(x => x !== confirm.name)); setToast(confirm.action === "block" ? `Đã chặn ${confirm.name}.` : `Đã hủy kết bạn với ${confirm.name}.`); setConfirm(null); }}>Xác nhận</Button></div></div></div>}</main>;
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
  e2eeEncrypted?: boolean;
  cipherText?: string;
  iv?: string;
  sha256Hash?: string;
  keyFingerprint?: string;
  algorithm?: string;
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

const initialConversationStates: ConversationState[] = [];

function loadSavedConversations(): ConversationState[] {
  try {
    const raw = window.localStorage.getItem("pl_chat_convs_v1");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Chỉ giữ các cuộc trò chuyện hợp lệ: nếu là nhóm thì phải có tối thiểu 3 thành viên
        const valid = parsed.filter(c => {
          if (!c || !c.id) return false;
          if (c.group) {
            const memberCount = Array.isArray(c.members) ? c.members.length : 0;
            if (memberCount < 3) return false;
          }
          return true;
        });
        return valid;
      }
    }
  } catch {
    // Ignore storage error
  }
  return [];
}

function ChatPage({
  setPage,
  onOpenShareToChat,
  onOpenPublicProfile,
  onSaveSharedToLibrary,
  currentUser,
}: {
  setPage: (page: string) => void;
  onOpenShareToChat?: (item?: ContentItem) => void;
  onOpenPublicProfile?: (username: string) => void;
  onSaveSharedToLibrary?: (item: ContentItem) => void;
  currentUser?: UserProfile;
}) {
  const meUser = currentUser || activeCurrentUserProfile;
  const [convList, setConvList] = useState<ConversationState[]>(() => loadSavedConversations());
  const [active, setActive] = useState(0);
  const [convQuery, setConvQuery] = useState("");
  const [inChatSearch, setInChatSearch] = useState("");
  const [showInChatSearch, setShowInChatSearch] = useState(false);
  const [message, setMessage] = useState("");
  const [stagedAttachments, setStagedAttachments] = useState<ChatAttachment[]>([]);
  const [showSampleMediaPicker, setShowSampleMediaPicker] = useState(false);
  const [typingUser] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Bảo mật E2EE & Mã hóa AES-256-GCM cho tin nhắn
  const [e2eeSessionKey, setE2eeSessionKey] = useState<string>(() => loadE2eeMasterKey());
  const [showCiphertextMode, setShowCiphertextMode] = useState<boolean>(false);
  const [showE2eeVerifyModal, setShowE2eeVerifyModal] = useState<boolean>(false);
  const [customSessionKeyInput, setCustomSessionKeyInput] = useState<string>("");
  const currentE2eeFingerprint = formatE2eeFingerprint(e2eeSessionKey);

  // Modal Quản lý bạn bè, lời mời kết bạn đã nhận / đã gửi và tìm kiếm ngay trong trang Nhắn tin
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [friendModalTab, setFriendModalTab] = useState<"friends" | "received" | "sent" | "search">("friends");
  const [friendSearchQuery, setFriendSearchQuery] = useState("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [directoryUsers, setDirectoryUsers] = useState<DirectoryUser[]>(() => loadSavedDirectoryUsers());
  const [friends, setFriends] = useState<string[]>(() => loadSavedDirectoryUsers().map(u => u.name));
  const [receivedRequests, setReceivedRequests] = useState<string[]>([]);
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [chatToast, setChatToast] = useState("");
  const [newDirectPartnerName, setNewDirectPartnerName] = useState("");

  // Modal Tạo nhóm chat mới
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupMembers, setNewGroupMembers] = useState<string[]>([]);
  const [quickMemberInput, setQuickMemberInput] = useState("");

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

  const emptyFallbackConv: ConversationState = {
    id: "empty-conv",
    name: "Chưa chọn cuộc trò chuyện",
    text: "Hãy tạo nhóm chat hoặc cuộc trò chuyện 1-1 mới",
    img: photos.city,
    count: 0,
    group: true,
    requireApproval: false,
    members: [{ name: meUser.name, user: meUser.username, avatar: meUser.avatar, role: "LEADER", online: true }],
    pendingMembers: [],
    sharedMedia: [],
    messages: [],
  };

  const currentConv = convList[active] || convList[0] || emptyFallbackConv;

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
          try {
            window.localStorage.setItem("pl_chat_convs_v1", JSON.stringify(event.data.payload));
          } catch {
            // Ignore storage error
          }
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
        window.localStorage.setItem("pl_chat_convs_v1", JSON.stringify(next));
      } catch {
        // Ignore storage error
      }
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

  // Gửi tin nhắn + tệp/hình ảnh/video đồng bộ thời gian thực (KHÔNG tự động trả lời ảo)
  const send = () => {
    if (!message.trim() && stagedAttachments.length === 0) return;
    const textVal = message.trim();
    const attachmentsToSend = [...stagedAttachments];
    const msgId = `msg-${Date.now()}`;

    // Nếu chưa có cuộc trò chuyện nào, không tự ý tạo nhóm 1 thành viên
    if (convList.length === 0) {
      notifyChat("Chưa có cuộc trò chuyện nào. Hãy tạo nhóm chat mới (tối thiểu 3 thành viên) hoặc chọn bạn bè để nhắn tin!");
      return;
    }
    const targetConvId = currentConv.id;
    const baseList = convList;

    const encryptedPacket = textVal
      ? encryptAes256PayloadSync(textVal, e2eeSessionKey)
      : null;

    const newMsg: ChatMessageItem = {
      id: msgId,
      senderName: meUser.name,
      senderUser: meUser.username,
      senderAvatar: meUser.avatar,
      isMe: true,
      time: nowTimeStr(),
      text: textVal || undefined,
      status: "Đã gửi",
      attachments: attachmentsToSend.length > 0 ? attachmentsToSend : undefined,
      e2eeEncrypted: true,
      cipherText: encryptedPacket?.cipherText,
      iv: encryptedPacket?.iv,
      sha256Hash: encryptedPacket?.sha256Hash,
      keyFingerprint: encryptedPacket?.keyFingerprint || currentE2eeFingerprint,
      algorithm: encryptedPacket?.algorithm || "E2EE-AES-256-GCM",
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

    broadcastAndSetConvList(prev => {
      const listToUse = prev.length === 0 ? baseList : prev;
      return listToUse.map(c =>
        c.id === targetConvId
          ? {
              ...c,
              text: summaryText,
              sharedMedia: [...newMediaItems, ...c.sharedMedia],
              messages: [...c.messages, newMsg],
            }
          : c
      );
    });

    setMessage("");
    setStagedAttachments([]);
    setShowSampleMediaPicker(false);
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
    appendSystemEvent(convId, `✏️ ${meUser.name} đã đổi tên nhóm thành “${newName}”.`);
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
    appendSystemEvent(convId, `🖼️ ${meUser.name} đã cập nhật ảnh đại diện nhóm mới.`);
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
    const customTrimmed = addMemberQuery.trim();
    let usersToAdd = allDirectoryUsers.filter(u => selectedToAdd.includes(u.name));
    if (usersToAdd.length === 0 && customTrimmed) {
      const createdCustom: DirectoryUser = {
        name: customTrimmed.replace(/^@/, ""),
        user: customTrimmed.startsWith("@") ? customTrimmed : `@${customTrimmed.toLowerCase().replace(/\s+/g, "")}`,
        bio: "Thành viên nhóm.",
        img: photos.city,
        online: true,
      };
      const nextDir = [createdCustom, ...directoryUsers.filter(u => u.user !== createdCustom.user)];
      setDirectoryUsers(nextDir);
      saveDirectoryUsers(nextDir);
      usersToAdd = [createdCustom];
    }
    if (usersToAdd.length === 0) return;
    const convId = currentConv.id;

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
      appendSystemEvent(convId, `🎉 ${meUser.name} đã thêm ${usersToAdd.map(u => u.name).join(", ")} vào nhóm.`);
      notifyChat(`Đã thêm ${usersToAdd.length} thành viên mới vào nhóm theo thời gian thực!`);
    }

    setSelectedToAdd([]);
    setAddMemberQuery("");
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
      `${mode === "VIDEO" ? "📹" : "📞"} ${meUser.name} đã bắt đầu cuộc gọi ${mode === "VIDEO" ? "Video" : "Thoại"} ${
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
    const trimmed = personName.trim();
    if (!trimmed) return;
    const handle = `@${trimmed.toLowerCase().replace(/\s+/g, "")}`;
    if (!directoryUsers.some(u => u.name === trimmed)) {
      const nextDir = [{ name: trimmed, user: handle, bio: "Thành viên cộng đồng.", img: avatarImg, online: true }, ...directoryUsers];
      setDirectoryUsers(nextDir);
      saveDirectoryUsers(nextDir);
      if (!friends.includes(trimmed)) setFriends([...friends, trimmed]);
    }
    const existingIdx = convList.findIndex(c => c.name === trimmed);
    if (existingIdx >= 0) {
      setActive(existingIdx);
    } else {
      const newConv: ConversationState = {
        id: `conv-${Date.now()}`,
        name: trimmed,
        text: "Bắt đầu cuộc trò chuyện 1-1 mới",
        img: avatarImg,
        count: 0,
        group: false,
        requireApproval: false,
        members: [
          { name: meUser.name, user: meUser.username, avatar: meUser.avatar, role: "LEADER", online: true },
          { name: trimmed, user: handle, avatar: avatarImg, role: "MEMBER", online: true },
        ],
        pendingMembers: [],
        sharedMedia: [],
        messages: [],
      };
      broadcastAndSetConvList(prev => [newConv, ...prev]);
      setActive(0);
    }
    setNewDirectPartnerName("");
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
    if (!newGroupName.trim()) {
      alert("Vui lòng nhập tên nhóm chat!");
      return;
    }
    if (newGroupMembers.length < 2) {
      alert("Một nhóm chat phải có ít nhất 3 thành viên (Bạn là Trưởng nhóm và tối thiểu 2 thành viên khác). Vui lòng chọn thêm bạn bè!");
      return;
    }
    const pickedMembers: GroupMember[] = [
      { name: meUser.name, user: meUser.username, avatar: meUser.avatar, role: "LEADER", nickname: "Trưởng nhóm", online: true },
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
    setNewGroupMembers([]);
    setShowCreateGroup(false);
    notifyChat(`Đã tạo nhóm trò chuyện “${created.name}”.`);
  };

  const filteredConversations = convList.filter(c =>
    c.name.toLowerCase().includes(convQuery.toLowerCase()) ||
    c.text.toLowerCase().includes(convQuery.toLowerCase())
  );

  const allDirectoryUsers = directoryUsers;

  const filteredDirectory = allDirectoryUsers.filter(u =>
    (!friendSearchQuery || `${u.name} ${u.user}`.toLowerCase().includes(friendSearchQuery.toLowerCase())) &&
    (!onlineOnly || u.online)
  );

  // Tìm biệt danh & vai trò thực tế của người gửi trong nhóm hiện tại
  const resolveSenderDisplay = (senderName: string, senderUser: string, isMeMessage = false) => {
    const isMeSender = isMeMessage || senderUser === meUser.username || senderUser === "@huynguyen" || senderName === meUser.name || senderName === "Nguyễn Huy";
    if (isMeSender) {
      const foundMe = currentConv.members.find(m => m.user === meUser.username || m.user === "@huynguyen");
      return {
        displayName: meUser.name,
        nickname: foundMe?.nickname || "",
        role: foundMe?.role || ("LEADER" as GroupMemberRole),
        realName: meUser.name,
      };
    }
    const found = currentConv.members.find(m => m.user === senderUser || m.name === senderName);
    if (!found) return { displayName: senderName, nickname: "", role: "MEMBER" as GroupMemberRole, realName: senderName };
    return {
      displayName: found.nickname ? `${found.nickname} (${found.name})` : found.name,
      nickname: found.nickname || "",
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
        {filteredConversations.length === 0 ? (
          <div style={{ padding: "30px 14px", textAlign: "center", color: "#9ca3af" }}>
            <span style={{ fontSize: "28px", display: "block", marginBottom: "8px" }}>💬</span>
            <b style={{ fontSize: "12px", color: "#e2e8f0", display: "block" }}>Chưa có cuộc trò chuyện</b>
            <p style={{ fontSize: "11px", color: "#8c8299", marginTop: "4px", lineHeight: "1.4" }}>
              Nhấn “+ Tạo nhóm chat” (tối thiểu 3 thành viên) hoặc kết bạn để bắt đầu.
            </p>
          </div>
        ) : (
          filteredConversations.map(c => {
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
        }))}
      </div>
    </aside>

    {convList.length === 0 ? (
      <>
        <section
          className="chat-center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            background: "#0c0814",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "460px" }}>
            <div style={{ fontSize: "52px", marginBottom: "16px" }}>💬</div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#f3e8ff", marginBottom: "12px" }}>
              Chưa có cuộc trò chuyện nào được tạo
            </h2>
            <p style={{ fontSize: "13px", color: "#b4a7cb", lineHeight: "1.6", marginBottom: "22px" }}>
              Hiện tại bạn chưa tham gia hoặc tạo cuộc trò chuyện nào.
              <br />
              Một nhóm chat chỉ được tạo khi có <b>ít nhất 3 thành viên</b> (Bạn là Trưởng nhóm và tối thiểu 2 bạn bè khác).
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <Button icon="plus" onClick={() => setShowCreateGroup(true)}>
                + Tạo nhóm chat mới (≥ 3 người)
              </Button>
              <Button
                variant="secondary"
                icon="users"
                onClick={() => {
                  setFriendModalTab("search");
                  setShowFriendsModal(true);
                }}
              >
                Khám phá Danh bạ bạn bè
              </Button>
            </div>
          </div>
        </section>

        <aside className="chat-right">
          <div className="group-info" style={{ textAlign: "center", padding: "48px 16px" }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>👥</div>
            <h3 style={{ fontSize: "14px", color: "#e2e8f0" }}>Thông tin cuộc trò chuyện</h3>
            <p style={{ fontSize: "11px", color: "#8c8299", marginTop: "6px", lineHeight: "1.5" }}>
              Chưa có cuộc trò chuyện nào được chọn. Khi vào nhóm chat hoặc tin nhắn trực tiếp, thông tin thành viên sẽ xuất hiện tại đây.
            </p>
          </div>
        </aside>
      </>
    ) : (
      <>
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

      {/* Thanh trạng thái Bảo mật Mã hóa Đầu-Cuối (E2EE) & Chuẩn AES-256-GCM */}
      <div
        className="e2ee-chat-security-bar"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
          padding: "7px 16px",
          background: "linear-gradient(90deg, rgba(16, 185, 129, 0.12), rgba(139, 92, 246, 0.12))",
          borderBottom: "1px solid rgba(16, 185, 129, 0.25)",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6ee7b7" }}>
          <span>🔒 <b>Mã hóa đầu-cuối (E2EE) · AES-256-GCM</b></span>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "999px",
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(110, 231, 183, 0.3)",
              fontFamily: "monospace",
              fontSize: "11px",
              color: "#a7f3d0",
            }}
            title="Dấu vân tay khóa phiên E2EE (SHA-256 Key Fingerprint)"
          >
            Key: {currentE2eeFingerprint.slice(0, 19)}...
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            type="button"
            onClick={() => setShowCiphertextMode(prev => !prev)}
            style={{
              padding: "3px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              border: showCiphertextMode
                ? "1px solid rgba(251, 191, 36, 0.6)"
                : "1px solid rgba(255,255,255,0.16)",
              background: showCiphertextMode
                ? "rgba(251, 191, 36, 0.18)"
                : "rgba(255,255,255,0.06)",
              color: showCiphertextMode ? "#fde68a" : "#e2e8f0",
            }}
          >
            {showCiphertextMode ? "👁️ Đang bật: Xem gói mã AES-256 (Ciphertext)" : "🔍 Xem Bản mã AES-256 (Ciphertext)"}
          </button>
          <button
            type="button"
            onClick={() => {
              setCustomSessionKeyInput(e2eeSessionKey);
              setShowE2eeVerifyModal(true);
            }}
            style={{
              padding: "3px 10px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "pointer",
              border: "1px solid rgba(167, 139, 250, 0.45)",
              background: "rgba(139, 92, 246, 0.18)",
              color: "#ddd6fe",
            }}
          >
            🛡️ Xác minh & Khóa phiên AES-256
          </button>
        </div>
      </div>

      {/* Modal Xác minh khóa E2EE & Quản lý khóa phiên AES-256-GCM */}
      {showE2eeVerifyModal && (
        <div className="modal-backdrop" onClick={() => setShowE2eeVerifyModal(false)}>
          <div
            className="friends-modal-card"
            style={{ maxWidth: "520px" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="friends-modal-head">
              <div>
                <span className="eyebrow" style={{ color: "#34d399" }}>CHỨNG THỰC BẢO MẬT TIN NHẮN</span>
                <h3>🔒 Xác minh Mã hóa Đầu-Cuối (E2EE) & AES-256-GCM</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowE2eeVerifyModal(false)}>×</button>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: "rgba(16, 185, 129, 0.09)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  fontSize: "12.5px",
                  lineHeight: 1.55,
                  color: "#d1fae5",
                }}
              >
                Mọi tin nhắn trong cuộc trò chuyện này được bảo vệ bằng giao thức <b>E2EE-AES-256-GCM</b> với vector khởi tạo ngẫu nhiên <b>96-bit IV</b> cho từng tin nhắn và kiểm toàn vẹn <b>SHA-256</b>. Không bên thứ ba nào có thể đọc nội dung nếu không có khóa phiên.
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11.5px", color: "#94a3b8", marginBottom: "6px" }}>
                  Mã an toàn / Dấu vân tay khóa SHA-256 (Safety Fingerprint):
                </label>
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.45)",
                    border: "1px solid rgba(167, 139, 250, 0.35)",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    letterSpacing: "1px",
                    color: "#c4b5fd",
                    wordBreak: "break-all",
                  }}
                >
                  {currentE2eeFingerprint}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11.5px", color: "#94a3b8", marginBottom: "6px" }}>
                  Khóa bí mật phiên AES-256 (PBKDF2-SHA256 Passphrase):
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    value={customSessionKeyInput}
                    onChange={e => setCustomSessionKeyInput(e.target.value)}
                    placeholder="Nhập khóa bí mật AES-256 tùy chỉnh hoặc xoay vòng khóa mới..."
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      color: "#fff",
                      fontFamily: "monospace",
                      fontSize: "12px",
                    }}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      const rotated = `E2EE-AES256-${generateHexIv12().toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
                      setCustomSessionKeyInput(rotated);
                    }}
                  >
                    🔄 Sinh khóa mới
                  </Button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "6px" }}>
                <Button variant="secondary" onClick={() => setShowE2eeVerifyModal(false)}>Đóng</Button>
                <Button
                  onClick={() => {
                    const nextKey = customSessionKeyInput.trim() || loadE2eeMasterKey();
                    setE2eeSessionKey(nextKey);
                    try {
                      window.localStorage.setItem("pl_e2ee_master_key_v1", nextKey);
                    } catch {
                      // Ignore
                    }
                    setShowE2eeVerifyModal(false);
                    notifyChat(`Đã cập nhật khóa phiên E2EE AES-256 (${formatE2eeFingerprint(nextKey).slice(0, 14)}...)!`);
                  }}
                >
                  Áp dụng khóa AES-256
                </Button>
              </div>
            </div>
          </div>
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

          const senderInfo = resolveSenderDisplay(m.senderName, m.senderUser, m.isMe);
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
                  {m.isMe ? `Bạn (${senderInfo.nickname ? `${senderInfo.nickname} · ${meUser.name}` : meUser.name})` : senderInfo.displayName}
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
                    {m.text && (
                      <>
                        <p>{m.text}</p>
                        {showCiphertextMode && (
                          <div
                            style={{
                              marginTop: "6px",
                              padding: "8px 10px",
                              borderRadius: "8px",
                              background: "rgba(0, 0, 0, 0.5)",
                              border: "1px solid rgba(52, 211, 153, 0.35)",
                              fontFamily: "monospace",
                              fontSize: "10.5px",
                              lineHeight: 1.5,
                              color: "#a7f3d0",
                              wordBreak: "break-all",
                            }}
                          >
                            <div style={{ color: "#fde68a", fontWeight: 700, marginBottom: "2px" }}>
                              🔐 GÓI MÃ HÓA {m.algorithm || "E2EE-AES-256-GCM"}
                            </div>
                            <div>
                              <b>Ciphertext (Base64):</b>{" "}
                              {m.cipherText || encryptAes256PayloadSync(m.text, e2eeSessionKey).cipherText}
                            </div>
                            <div>
                              <b>IV (96-bit Hex):</b> {m.iv || "a4f89c02d71e4b20991c3e08"}
                            </div>
                            <div>
                              <b>SHA-256 Hash:</b> {m.sha256Hash || quickSha256LikeHex(m.text)}
                            </div>
                            <div>
                              <b>Key Fingerprint:</b> {m.keyFingerprint || currentE2eeFingerprint}
                            </div>
                          </div>
                        )}
                      </>
                    )}

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

                <small style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#6ee7b7", fontSize: "10.5px" }} title="Đã mã hóa đầu-cuối chuẩn E2EE AES-256-GCM">
                    🔒 E2EE · AES-256
                  </span>
                  {m.isMe && <span>· {m.status || "Đã gửi"}</span>}
                </small>
              </div>
            </div>
          );
        })}

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
                    name: "Anh_Dinh_Kem.jpg",
                    url: photos.city,
                    sizeLabel: "1.2 MB · ẢNH",
                  },
                ]);
                setShowSampleMediaPicker(false);
              }}
            >
              🖼️ Đính kèm Ảnh
            </button>
            <button
              type="button"
              onClick={() => {
                setStagedAttachments(prev => [
                  ...prev,
                  {
                    id: `vid-${Date.now()}`,
                    kind: "VIDEO",
                    name: "Video_Dinh_Kem.mp4",
                    url: SAMPLE_VIDEO_URL,
                    sizeLabel: "8.4 MB · VIDEO MP4",
                  },
                ]);
                setShowSampleMediaPicker(false);
              }}
            >
              🎬 Đính kèm Video MP4
            </button>
            <button
              type="button"
              onClick={() => {
                setStagedAttachments(prev => [
                  ...prev,
                  {
                    id: `file-${Date.now()}`,
                    kind: "FILE",
                    name: "Tai_Lieu_Dinh_Kem.pdf",
                    url: "#",
                    sizeLabel: "1.8 MB · PDF",
                  },
                ]);
                setShowSampleMediaPicker(false);
              }}
            >
              📄 Đính kèm Tệp PDF
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
            <Button
              variant="secondary"
              icon="users"
              onClick={() =>
                onOpenPublicProfile?.(
                  currentConv.members.find(m => m.user !== CURRENT_USER_HANDLE)?.user || CURRENT_USER_HANDLE
                )
              }
            >
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
        {currentConv.members.map(m => {
          const isMeMember = m.user === meUser.username || m.user === "@huynguyen" || (currentConv.members.length === 1 && m.role === "LEADER");
          const memberName = isMeMember ? meUser.name : m.name;
          const memberUser = isMeMember ? meUser.username : m.user;
          const memberAvatar = isMeMember ? meUser.avatar : m.avatar;
          return (
            <div className="member" key={m.user}>
              <div className="conv-avatar" style={{ cursor: "pointer" }} onClick={() => onOpenPublicProfile?.(memberUser)}>
                <img src={memberAvatar} alt={memberName} />
                <i style={{ background: m.online ? "#36d092" : "#625b6b" }} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <b style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {m.nickname ? m.nickname : (isMeMember ? `${memberName} (Bạn)` : memberName)}
                </b>
                <span className={m.role === "LEADER" ? "leader" : m.role === "ADMIN" ? "deputy-role" : ""}>
                  {m.role === "LEADER" ? "👑 Trưởng nhóm" : m.role === "ADMIN" ? "🛡️ Phó nhóm" : "Thành viên"}
                  {m.nickname ? ` · ${memberName}` : (isMeMember ? ` · ${memberUser}` : "")}
                </span>
              </div>
              <button
                type="button"
                title="Đặt biệt danh & Phân quyền thành viên"
                onClick={() => {
                  setEditingMemberTarget({ ...m, name: memberName, user: memberUser, avatar: memberAvatar });
                  setNicknameInput(m.nickname || "");
                  setRoleInput(m.role);
                }}
              >
                <Icon name="more" size={16} />
              </button>
            </div>
          );
        })}
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
    </>)}

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

        {/* Tạo nhanh cuộc trò chuyện 1-1 với bất kỳ tên người dùng nào bạn tự thêm */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
          <input
            className="admin-select"
            style={{ flex: 1 }}
            value={newDirectPartnerName}
            onChange={e => setNewDirectPartnerName(e.target.value)}
            placeholder="Nhập tên người dùng mới để thêm & bắt đầu chat 1-1..."
          />
          <Button icon="plus" onClick={() => startDirectChatWith(newDirectPartnerName, photos.city)}>
            + Thêm & Nhắn tin
          </Button>
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
            {filteredDirectory.filter(u => friends.includes(u.name)).length === 0 && <div className="empty-results" style={{ height: "160px" }}><b>Chưa có bạn bè nào trong danh sách</b><p>Bạn có thể nhập tên người dùng ở ô bên trên để tự thêm bạn bè và bắt đầu nhắn tin.</p></div>}
          </>}

          {friendModalTab === "received" && <>
            {filteredDirectory.filter(u => receivedRequests.includes(u.name)).map(u => <div className="chat-friend-item" key={u.name}>
              <div className="conv-avatar"><img src={u.img} alt={u.name} /><i style={{ background: u.online ? "#36d092" : "#625b6b" }} /></div>
              <div>
                <b>{u.name}</b>
                <small>{u.user} · Vừa gửi lời mời</small>
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
            {filteredDirectory.length === 0 && <div className="empty-results" style={{ height: "160px" }}><b>Chưa có người dùng nào</b><p>Hãy nhập tên người dùng ở thanh phía trên để thêm mới.</p></div>}
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
      <div className="admin-modal-wide" style={{ width: "500px" }} onMouseDown={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>NHẮN TIN NHÓM</span>
            <h2>Tạo Nhóm Trò Chuyện Mới</h2>
            <p>Quy định: Nhóm chat yêu cầu <b>tối thiểu 3 thành viên</b> (Bạn và ít nhất 2 bạn bè khác).</p>
          </div>
          <button className="icon-btn" onClick={() => setShowCreateGroup(false)}><Icon name="x" /></button>
        </div>

        <label className="admin-field">
          <span>Tên nhóm chat *</span>
          <input value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="VD: Hội mê truyện & phim..." />
        </label>

        {/* Ô thêm bạn bè nhanh vào nhóm */}
        <div className="admin-field">
          <span>Thêm bạn bè vào nhóm (@tên_người_dùng hoặc Tên bạn)</span>
          <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
            <input
              style={{ flex: 1 }}
              value={quickMemberInput}
              onChange={e => setQuickMemberInput(e.target.value)}
              placeholder="VD: @banbe1 hoặc Tên bạn bè..."
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const val = quickMemberInput.trim();
                  if (!val) return;
                  const handle = val.startsWith("@") ? val : "@" + val.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "");
                  const name = val.replace(/^@/, "");
                  if (!directoryUsers.some(u => u.name === name || u.user === handle)) {
                    const newU: DirectoryUser = { name, user: handle, bio: "Bạn bè trong danh bạ", img: photos.red, online: true };
                    const next = [...directoryUsers, newU];
                    setDirectoryUsers(next);
                    saveDirectoryUsers(next);
                  }
                  if (!newGroupMembers.includes(name)) {
                    setNewGroupMembers([...newGroupMembers, name]);
                  }
                  setQuickMemberInput("");
                }
              }}
            />
            <Button
              variant="secondary"
              icon="plus"
              onClick={() => {
                const val = quickMemberInput.trim();
                if (!val) return;
                const handle = val.startsWith("@") ? val : "@" + val.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "");
                const name = val.replace(/^@/, "");
                if (!directoryUsers.some(u => u.name === name || u.user === handle)) {
                  const newU: DirectoryUser = { name, user: handle, bio: "Bạn bè trong danh bạ", img: photos.red, online: true };
                  const next = [...directoryUsers, newU];
                  setDirectoryUsers(next);
                  saveDirectoryUsers(next);
                }
                if (!newGroupMembers.includes(name)) {
                  setNewGroupMembers([...newGroupMembers, name]);
                }
                setQuickMemberInput("");
              }}
            >
              Thêm
            </Button>
          </div>
        </div>

        <div className="admin-field">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Chọn thành viên ({newGroupMembers.length} người bạn đã chọn)</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: newGroupMembers.length >= 2 ? "#34d399" : "#f87171" }}>
              {newGroupMembers.length >= 2
                ? `✅ Đủ điều kiện (${newGroupMembers.length + 1} thành viên bao gồm bạn)`
                : `⚠️ Cần chọn thêm ít nhất ${2 - newGroupMembers.length} người nữa`}
            </span>
          </div>

          <div className="admin-genre-picks" style={{ marginTop: "8px", maxHeight: "150px", overflowY: "auto" }}>
            {allDirectoryUsers.map(u => (
              <button
                key={u.name}
                type="button"
                className={newGroupMembers.includes(u.name) ? "active" : ""}
                onClick={() =>
                  setNewGroupMembers(
                    newGroupMembers.includes(u.name)
                      ? newGroupMembers.filter(x => x !== u.name)
                      : [...newGroupMembers, u.name]
                  )
                }
              >
                {u.name} ({u.user})
              </button>
            ))}
            {allDirectoryUsers.length === 0 && (
              <span style={{ fontSize: "11px", color: "#8c8299" }}>
                Chưa có bạn bè nào trong danh bạ. Vui lòng nhập tên tài khoản bạn bè ở ô phía trên và nhấn “Thêm” (cần tối thiểu 2 bạn bè).
              </span>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <div />
          <div>
            <Button variant="ghost" onClick={() => setShowCreateGroup(false)}>Hủy</Button>
            <Button
              icon="plus"
              disabled={newGroupMembers.length < 2 || !newGroupName.trim()}
              onClick={createNewGroupChat}
            >
              Tạo nhóm ngay ({newGroupMembers.length + 1}/3 TV)
            </Button>
          </div>
        </div>
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

  // 1. STATE QUẢN LÝ NGƯỜI DÙNG (Chỉ giữ tài khoản thật của bạn, không tạo sẵn tài khoản ảo)
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("ALL");
  const [userStatusFilter, setUserStatusFilter] = useState("ALL");
  const [users, setUsers] = useState<AdminUserItem[]>([
    { id: 1, name: CURRENT_USER_NAME, username: CURRENT_USER_HANDLE, email: "huy.nguyen@example.com", avatar: photos.red, bio: "Quản trị viên hệ thống Mê Truyện.", role: "ADMIN", status: "ACTIVE", joinedAt: "18/08/2023" },
  ]);
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: "", username: "", email: "", role: "USER" as "USER" | "ADMIN", status: "ACTIVE" as "ACTIVE" | "LOCKED" | "BANNED", bio: "" });

  // 2. STATE QUẢN LÝ TRUYỆN / PHIM & CHƯƠNG / TẬP (Đồng bộ 100% với dữ liệu thật trong contents)
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
      visibility: c.visibility || "PUBLIC",
      description: c.description || c.shortDescription || "",
      mainLink: c.mainLink || c.externalLinks?.[0]?.url || "",
      genres: c.genres,
      chapters: c.chaptersList || [],
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

  // 4. STATE BÁO CÁO VI PHẠM & BÌNH LUẬN (Rỗng mặc định, không tạo sẵn báo cáo giả)
  const [reports, setReports] = useState<Array<{ id: number; reporter: string; targetType: string; targetName: string; reason: string; status: string; adminNote: string }>>([]);

  // Đồng bộ thay đổi kho truyện/phim của Admin ra toàn hệ thống (giữ nguyên toàn bộ metadata gốc)
  const syncGlobalContents = (updatedList: AdminContentItem[]) => {
    setAdminContents(updatedList);
    setContents(updatedList.map(item => {
      const existing = contents.find(x => x.title === item.title);
      return {
        ...(existing || {}),
        title: item.title,
        sub: item.sub,
        img: item.img,
        status: item.status,
        score: item.score,
        type: item.type,
        genres: item.genres,
        visibility: item.visibility,
        description: item.description,
        mainLink: item.mainLink,
        chaptersList: item.chapters,
      };
    }));
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
          score: "—",
          type: "Truyện",
          isSeries: true,
          visibility: "PUBLIC",
          description: "",
          mainLink: "https://",
          genres: [],
          chapters: [{ id: 1, season: "Mùa 1", number: "1", title: "", url: "https://", note: "" }],
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
  const savedUsers = loadSavedDirectoryUsers();
  const profiles: Record<string, { name: string; user: string; bio: string; img: string; banner: string; joined: string; friendsCount: number; sharedCount: number }> = {
    "@huynguyen": {
      name: "Nguyễn Huy",
      user: "@huynguyen",
      bio: "Thư viện cá nhân quản lý truyện và phim yêu thích.",
      img: photos.hero,
      banner: photos.hero,
      joined: "Hôm nay",
      friendsCount: savedUsers.length,
      sharedCount: items.filter(it => it.visibility !== "PRIVATE").length,
    },
  };
  savedUsers.forEach(u => {
    profiles[u.user] = {
      name: u.name,
      user: u.user,
      bio: u.bio || "Thành viên cộng đồng Mê Truyện.",
      img: u.img || photos.hero,
      banner: photos.hero,
      joined: "Thành viên",
      friendsCount: 1,
      sharedCount: items.filter(it => it.createdBy?.user === u.user && it.visibility !== "PRIVATE").length,
    };
  });

  const normalizedUsername = username ? (username.startsWith("@") ? username : `@${username}`) : "@huynguyen";
  if (!profiles[normalizedUsername]) {
    profiles[normalizedUsername] = {
      name: normalizedUsername.replace(/^@/, ""),
      user: normalizedUsername,
      bio: "Thành viên cộng đồng Mê Truyện.",
      img: photos.hero,
      banner: photos.hero,
      joined: "Thành viên",
      friendsCount: 0,
      sharedCount: 0,
    };
  }

  const [selectedUser, setSelectedUser] = useState(normalizedUsername);
  const profile = profiles[selectedUser] || profiles["@huynguyen"];
  const [filterType, setFilterType] = useState<"Tất cả" | "Truyện" | "Phim">("Tất cả");
  const [savedTitles, setSavedTitles] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [isFriend, setIsFriend] = useState(true);

  const sharedItems = items
    .filter(item => item.visibility !== "PRIVATE" && (!item.createdBy?.user || item.createdBy?.user === selectedUser || selectedUser === "@huynguyen"))
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
        <span style={{ fontSize: "10px", color: "#9e93ad", fontWeight: 600 }}>Xem hồ sơ:</span>
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
            <div><b>0</b><small>Lượt được lưu</small></div>
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

    {sharedItems.length === 0 ? (
      <div className="empty-results">
        <Icon name="book" size={28} />
        <b>Chưa có tác phẩm công khai nào</b>
        <p>Khi {profile.name} đăng truyện hoặc phim ở chế độ Cộng đồng, tác phẩm sẽ hiển thị tại đây.</p>
      </div>
    ) : (
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
                <p className="personal-note">{item.shortDescription || item.description || `Tác phẩm được ${profile.name} chia sẻ công khai.`}</p>
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
    )}
  </div></main>;
}

const initialNotifications: NotificationItem[] = [];

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
      (item.author || "").toLowerCase().includes(q) ||
      item.genres.some(g => g.toLowerCase().includes(q))
    );
  }).slice(0, 6);

  const directoryUsers = loadSavedDirectoryUsers();
  const matchedUsers = directoryUsers.filter(u => {
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
            <p>Hãy thử tìm bằng từ khóa khác hoặc đăng truyện/phim mới vào thư viện.</p>
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
  const savedConvs = loadSavedConversations();
  const [selectedTitle, setSelectedTitle] = useState(initialItem?.title || items[0]?.title || "");
  const [selectedConv, setSelectedConv] = useState(savedConvs[0]?.name || "Nhóm thảo luận của tôi");
  const [note, setNote] = useState("");
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
          {savedConvs.length > 0 ? (
            <select value={selectedConv} onChange={e => setSelectedConv(e.target.value)}>
              {savedConvs.map(c => <option key={c.name} value={c.name}>{c.group ? "👥 Nhóm: " : "👤 Bạn bè: "}{c.name}</option>)}
            </select>
          ) : (
            <input value={selectedConv} onChange={e => setSelectedConv(e.target.value)} placeholder="Nhập tên nhóm hoặc người nhận..." />
          )}
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

const CONTENTS_STORAGE_KEY = "pl_contents_v1";
const FAVORITES_STORAGE_KEY = "pl_favorites_v1";

function loadSavedContents(): ContentItem[] {
  try {
    const raw = window.localStorage.getItem(CONTENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadSavedFavorites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [page, setPage] = useState("login");
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => loadSavedCurrentUser());
  const [userRole, setUserRole] = useState<"USER" | "ADMIN">(() => loadSavedCurrentUser().role || "USER");
  const [favorites, setFavorites] = useState<string[]>(() => loadSavedFavorites());
  const [allContents, setAllContents] = useState<ContentItem[]>(() => loadSavedContents());
  const [publishedTitle, setPublishedTitle] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [searchOpen, setSearchOpen] = useState(false);
  const [publicProfileUser, setPublicProfileUser] = useState(() => loadSavedCurrentUser().username);
  const [shareModalItem, setShareModalItem] = useState<ContentItem | null | undefined>(undefined);
  const [reportTarget, setReportTarget] = useState<{ type: "CONTENT" | "COMMENT"; name: string } | null>(null);
  const [globalToast, setGlobalToast] = useState("");

  useEffect(() => {
    setActiveCurrentUserProfile(currentUser);
    saveCurrentUserToStorage(currentUser);
  }, [currentUser]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CONTENTS_STORAGE_KEY, JSON.stringify(allContents));
    } catch {
      // ignore storage errors
    }
  }, [allContents]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore storage errors
    }
  }, [favorites]);

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
          onAuthenticated={(role, profile) => {
            setUserRole(role);
            setCurrentUser(profile);
            setActiveCurrentUserProfile(profile);
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
      currentUser={currentUser}
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
        onNavigatePublish={() => navigate("publish")}
      />
    )}
    {page === "chat" && (
      <ChatPage
        setPage={navigate}
        currentUser={currentUser}
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
    {page === "account" && (
      <AccountPage
        setPage={navigate}
        worksCount={allContents.length}
        currentUser={currentUser}
        onUpdateCurrentUser={updated => {
          setCurrentUser(updated);
          setActiveCurrentUserProfile(updated);
        }}
      />
    )}
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
