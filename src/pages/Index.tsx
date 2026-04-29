import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/065d3492-188e-4a88-aec6-8f5d0527832f/files/fa12a1db-fe44-4b90-8d2b-37665014ace2.jpg';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  badge?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU: MenuItem[] = [
  { id: 1, name: 'Маргарита', description: 'Томатный соус, моцарелла, свежий базилик', price: 490, emoji: '🍕', category: 'Пицца большая', badge: 'ХИТ' },
  { id: 2, name: 'Пепперони', description: 'Острая салями, моцарелла, томатный соус', price: 540, emoji: '🍕', category: 'Пицца большая' },
  { id: 17, name: 'Маргарита мини', description: 'Томатный соус, моцарелла, свежий базилик', price: 290, emoji: '🍕', category: 'Пицца маленькая' },
  { id: 18, name: 'Пепперони мини', description: 'Острая салями, моцарелла, томатный соус', price: 320, emoji: '🍕', category: 'Пицца маленькая' },
  { id: 3, name: 'Куриная отбивная', description: 'Филе в панировке, картофельное пюре, соус', price: 420, emoji: '🍗', category: 'Горячие', badge: 'НОВИНКА' },
  { id: 4, name: 'Стейк из свинины', description: 'Сочный стейк с грилем, розмарин, тимьян', price: 580, emoji: '🥩', category: 'Горячие' },
  { id: 5, name: 'Брускетта', description: 'Хрустящий хлеб, томаты, базилик, оливковое масло', price: 220, emoji: '🥖', category: 'Закуски' },
  { id: 6, name: 'Крылья буффало', description: 'Острые куриные крылья, соус ранч', price: 310, emoji: '🍗', category: 'Закуски' },
  { id: 7, name: 'Греческий салат', description: 'Огурец, томат, фета, оливки, орегано', price: 290, emoji: '🥗', category: 'Салаты' },
  { id: 8, name: 'Цезарь с курицей', description: 'Романо, куриное филе, пармезан, сухарики', price: 340, emoji: '🥗', category: 'Салаты' },
  { id: 9, name: 'Том ям', description: 'Острый тайский суп с кокосом и креветками', price: 480, emoji: '🍜', category: 'Супы' },
  { id: 10, name: 'Борщ домашний', description: 'По классическому рецепту, со сметаной', price: 280, emoji: '🍲', category: 'Супы' },
  { id: 11, name: 'Лимонад', description: 'Свежий лимон, мята, газированная вода', price: 180, emoji: '🍋', category: 'Напитки' },
  { id: 12, name: 'Флэт уайт', description: 'Двойной эспрессо с бархатистым молоком', price: 220, emoji: '☕', category: 'Напитки', badge: 'АВТОРСКИЙ' },
  { id: 13, name: 'Чизкейк Нью-Йорк', description: 'Нежный, сливочный, с ягодным компотом', price: 320, emoji: '🍰', category: 'Десерты' },
  { id: 14, name: 'Тирамису', description: 'Классический итальянский десерт с маскарпоне', price: 290, emoji: '🍮', category: 'Десерты' },
  { id: 15, name: 'Картофель фри', description: 'Хрустящий, с соусом на выбор', price: 180, emoji: '🍟', category: 'Гарниры' },
  { id: 16, name: 'Рис с овощами', description: 'Пропаренный рис, сезонные овощи, зелень', price: 160, emoji: '🍚', category: 'Гарниры' },
];

const CATEGORIES = ['Все', 'Пицца', 'Горячие', 'Закуски', 'Салаты', 'Супы', 'Напитки', 'Десерты', 'Гарниры'];
const PIZZA_SUBCATEGORIES = ['Пицца большая', 'Пицца маленькая'];

const NAV_LINKS = [
  { label: 'Главная', href: '#hero' },
  { label: 'Меню', href: '#menu' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'Контакты', href: '#contacts' },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Все');
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', comment: '' });
  const [orderSent, setOrderSent] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMenuVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c);
      }
      return prev.filter(c => c.id !== id);
    });
  };

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  const filteredMenu = activeCategory === 'Все'
    ? MENU
    : activeCategory === 'Пицца'
      ? MENU.filter(item => PIZZA_SUBCATEGORIES.includes(item.category))
      : MENU.filter(item => item.category === activeCategory);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      setCart([]);
      setCartOpen(false);
      setOrderForm({ name: '', phone: '', address: '', comment: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-cafe-dark text-white overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="glass rounded-full px-6 py-2 flex items-center gap-8">
            <span className="font-display text-xl font-bold tracking-widest text-gradient">ПИЦЦА</span>
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-rubik text-sm text-white/60 hover:text-[var(--neon-orange)] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative btn-neon px-5 py-2.5 rounded-full flex items-center gap-2 font-display text-sm tracking-wide"
          >
            <Icon name="ShoppingCart" size={16} />
            Корзина
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-cafe-dark rounded-full text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cafe-dark/70 via-cafe-dark/50 to-cafe-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-cafe-dark/80 via-transparent to-cafe-dark/40" />

        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--neon-orange)]/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-[var(--neon-pink)]/5 blur-3xl" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm font-rubik text-white/70">
            <span className="w-2 h-2 rounded-full bg-[var(--neon-orange)] animate-pulse" />
            Открыто до 23:00 • Доставка от 30 минут
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase leading-none mb-6">
            <span className="text-gradient">ПИЦЦА</span>
          </h1>

          <p className="font-rubik text-white/60 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Авторская кухня, свежие продукты и быстрая доставка прямо к вашей двери
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#menu" className="btn-neon px-8 py-4 rounded-full text-base font-display tracking-wider uppercase">
              Смотреть меню
            </a>
            <a href="#delivery" className="glass px-8 py-4 rounded-full text-base font-display tracking-wider uppercase hover:border-[var(--neon-orange)]/40 transition-all duration-300">
              Условия доставки
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="font-rubik text-xs tracking-widest uppercase">Листай вниз</span>
          <Icon name="ChevronDown" size={20} className="animate-bounce" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-8 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '50+', label: 'Блюд в меню', icon: 'UtensilsCrossed' },
            { value: '30 мин', label: 'Время доставки', icon: 'Clock' },
            { value: '4.9 ★', label: 'Рейтинг', icon: 'Star' },
            { value: '1000+', label: 'Довольных гостей', icon: 'Users' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--neon-orange)]/10 flex items-center justify-center flex-shrink-0">
                <Icon name={stat.icon} size={18} className="text-[var(--neon-orange)]" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-gradient">{stat.value}</div>
                <div className="font-rubik text-xs text-white/40">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="font-display text-sm tracking-widest text-[var(--neon-orange)] uppercase">Наше меню</span>
            <h2 className="font-display text-5xl font-bold uppercase mt-2">Что приготовить<br /><span className="text-gradient">для вас?</span></h2>
          </div>

          <div className="flex gap-3 mb-10 overflow-x-auto scrollbar-hide pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full font-display text-sm tracking-wide uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'btn-neon'
                    : 'glass text-white/60 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {activeCategory === 'Пицца' ? (
            PIZZA_SUBCATEGORIES.map(sub => {
              const subItems = filteredMenu.filter(item => item.category === sub);
              const label = sub === 'Пицца большая' ? 'Большая' : 'Маленькая';
              return (
                <div key={sub} className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-display text-2xl font-bold uppercase tracking-wide">{label}</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {subItems.map((item, i) => {
                      const inCart = cart.find(c => c.id === item.id);
                      return (
                        <div
                          key={item.id}
                          className="card-dish rounded-2xl overflow-hidden"
                          style={{ animation: menuVisible ? `fade-up 0.5s ease-out ${i * 0.05}s both` : 'none' }}
                        >
                          <div className="relative bg-gradient-to-br from-white/5 to-white/0 h-36 flex items-center justify-center text-6xl">
                            {item.emoji}
                            {item.badge && (
                              <span className="absolute top-3 right-3 bg-[var(--neon-orange)] text-white text-[10px] font-display tracking-wider px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="font-display text-base font-semibold uppercase tracking-wide mb-1">{item.name}</div>
                            <div className="font-rubik text-xs text-white/40 mb-4 leading-relaxed">{item.description}</div>
                            <div className="flex items-center justify-between">
                              <span className="font-display text-lg font-bold text-[var(--neon-orange)]">{item.price} ₽</span>
                              {inCart ? (
                                <div className="flex items-center gap-2">
                                  <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <Icon name="Minus" size={12} />
                                  </button>
                                  <span className="font-display text-sm w-4 text-center">{inCart.quantity}</span>
                                  <button onClick={() => addToCart(item)} className="w-7 h-7 rounded-full bg-[var(--neon-orange)] flex items-center justify-center hover:bg-[var(--neon-orange)]/80 transition-colors">
                                    <Icon name="Plus" size={12} />
                                  </button>
                                </div>
                              ) : (
                                <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full btn-neon flex items-center justify-center">
                                  <Icon name="Plus" size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMenu.map((item, i) => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <div
                  key={item.id}
                  className="card-dish rounded-2xl overflow-hidden"
                  style={{ animation: menuVisible ? `fade-up 0.5s ease-out ${i * 0.05}s both` : 'none' }}
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/0 h-36 flex items-center justify-center text-6xl">
                    {item.emoji}
                    {item.badge && (
                      <span className="absolute top-3 right-3 bg-[var(--neon-orange)] text-white text-[10px] font-display tracking-wider px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="font-display text-base font-semibold uppercase tracking-wide mb-1">{item.name}</div>
                    <div className="font-rubik text-xs text-white/40 mb-4 leading-relaxed">{item.description}</div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-[var(--neon-orange)]">{item.price} ₽</span>
                      {inCart ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="font-display text-sm w-4 text-center">{inCart.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-7 h-7 rounded-full bg-[var(--neon-orange)] flex items-center justify-center hover:bg-[var(--neon-orange)]/80 transition-colors"
                          >
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 rounded-full btn-neon flex items-center justify-center"
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="font-display text-sm tracking-widest text-[var(--neon-orange)] uppercase">Доставка</span>
            <h2 className="font-display text-5xl font-bold uppercase mt-2">Быстро и<br /><span className="text-gradient">удобно</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: 'Clock', title: '30–45 минут', desc: 'Среднее время доставки по городу', color: 'var(--neon-orange)' },
              { icon: 'MapPin', title: 'Весь город', desc: 'Доставляем по всему городу и пригороду', color: 'var(--neon-yellow)' },
              { icon: 'Package', title: 'От 500 ₽', desc: 'Минимальная сумма заказа, доставка бесплатно', color: 'var(--neon-pink)' },
            ].map((card) => (
              <div key={card.title} className="glass rounded-2xl p-6 glass-hover">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${card.color}18` }}
                >
                  <Icon name={card.icon} size={22} style={{ color: card.color }} />
                </div>
                <div className="font-display text-xl font-bold uppercase mb-2">{card.title}</div>
                <div className="font-rubik text-sm text-white/50">{card.desc}</div>
              </div>
            ))}
          </div>

          <div className="neon-border rounded-3xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--neon-orange)]/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Truck" size={18} className="text-[var(--neon-orange)]" />
              </div>
              <div>
                <div className="font-display text-xl uppercase font-bold">Зоны доставки и время работы</div>
                <div className="font-rubik text-sm text-white/40 mt-1">Работаем ежедневно с 10:00 до 23:00</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { zone: 'Зона 1 (0–3 км)', price: 'Бесплатно', time: '25–35 мин' },
                { zone: 'Зона 2 (3–7 км)', price: '150 ₽', time: '35–50 мин' },
                { zone: 'Зона 3 (7–12 км)', price: '250 ₽', time: '50–70 мин' },
              ].map((z) => (
                <div key={z.zone} className="bg-white/[0.03] rounded-xl p-4">
                  <div className="font-rubik text-xs text-white/40 mb-1">{z.zone}</div>
                  <div className="font-display text-lg font-bold text-[var(--neon-orange)]">{z.price}</div>
                  <div className="font-rubik text-sm text-white/60">{z.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="font-display text-sm tracking-widest text-[var(--neon-orange)] uppercase">Контакты</span>
            <h2 className="font-display text-5xl font-bold uppercase mt-2">Мы всегда<br /><span className="text-gradient">на связи</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (999) 123-45-67', href: 'tel:+79991234567' },
                { icon: 'MessageCircle', label: 'WhatsApp', value: 'Написать в WhatsApp', href: '#' },
                { icon: 'MapPin', label: 'Адрес', value: 'ул. Гастрономическая, 1', href: '#' },
                { icon: 'Clock', label: 'Режим работы', value: 'Ежедневно 10:00 – 23:00', href: '#' },
                { icon: 'Instagram', label: 'Instagram', value: '@cafe_vkus', href: '#' },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="glass rounded-2xl p-5 flex items-center gap-4 glass-hover group block"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--neon-orange)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--neon-orange)]/20 transition-colors">
                    <Icon name={contact.icon} size={18} className="text-[var(--neon-orange)]" />
                  </div>
                  <div>
                    <div className="font-rubik text-xs text-white/40">{contact.label}</div>
                    <div className="font-display text-base font-medium">{contact.value}</div>
                  </div>
                  <Icon name="ArrowUpRight" size={16} className="ml-auto text-white/20 group-hover:text-[var(--neon-orange)] transition-colors" />
                </a>
              ))}
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="font-display text-xl uppercase font-bold mb-6">Задать вопрос</div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--neon-orange)]/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--neon-orange)]/50 transition-colors"
                />
                <textarea
                  placeholder="Сообщение"
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--neon-orange)]/50 transition-colors resize-none"
                />
                <button className="w-full btn-neon py-3 rounded-xl font-display text-sm tracking-widest uppercase">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-2xl font-bold text-gradient tracking-widest">ПИЦЦА</span>
          <p className="font-rubik text-xs text-white/30">© 2025 Кафе «Вкус без границ». Все права защищены.</p>
          <div className="flex gap-4">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="font-rubik text-xs text-white/30 hover:text-white/60 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* КОРЗИНА — БОКОВАЯ ПАНЕЛЬ */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-cafe-charcoal border-l border-white/10 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <div className="font-display text-xl uppercase font-bold">Ваш заказ</div>
                <div className="font-rubik text-xs text-white/40">{totalItems} позиций на {totalPrice} ₽</div>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                <Icon name="X" size={16} />
              </button>
            </div>

            {orderSent ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="text-6xl mb-4 animate-float">🎉</div>
                <div className="font-display text-2xl uppercase font-bold mb-2 text-gradient">Заказ принят!</div>
                <div className="font-rubik text-sm text-white/50">Ожидайте звонка оператора в течение 5 минут</div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-white/30">
                      <Icon name="ShoppingCart" size={40} />
                      <div className="font-rubik text-sm mt-3">Корзина пуста</div>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="glass rounded-xl p-4 flex items-center gap-3">
                        <span className="text-3xl">{item.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-sm uppercase font-semibold truncate">{item.name}</div>
                          <div className="font-rubik text-xs text-white/40">{item.price} ₽ × {item.quantity}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Icon name="Minus" size={10} />
                          </button>
                          <span className="font-display text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-full bg-[var(--neon-orange)] flex items-center justify-center hover:bg-[var(--neon-orange)]/80 transition-colors">
                            <Icon name="Plus" size={10} />
                          </button>
                        </div>
                        <div className="font-display text-sm font-bold text-[var(--neon-orange)] w-16 text-right">
                          {item.price * item.quantity} ₽
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/10">
                    <form onSubmit={handleOrder} className="space-y-3">
                      <div className="font-display text-sm uppercase tracking-wide text-white/60 mb-4">Оформление доставки</div>
                      <input
                        required
                        type="text"
                        placeholder="Ваше имя"
                        value={orderForm.name}
                        onChange={e => setOrderForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--neon-orange)]/50 transition-colors"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Телефон"
                        value={orderForm.phone}
                        onChange={e => setOrderForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--neon-orange)]/50 transition-colors"
                      />
                      <input
                        required
                        type="text"
                        placeholder="Адрес доставки"
                        value={orderForm.address}
                        onChange={e => setOrderForm(p => ({ ...p, address: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--neon-orange)]/50 transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Комментарий (необязательно)"
                        value={orderForm.comment}
                        onChange={e => setOrderForm(p => ({ ...p, comment: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-rubik text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--neon-orange)]/50 transition-colors"
                      />
                      <div className="flex items-center justify-between py-3">
                        <span className="font-rubik text-sm text-white/50">Итого:</span>
                        <span className="font-display text-2xl font-bold text-gradient">{totalPrice} ₽</span>
                      </div>
                      <button type="submit" className="w-full btn-neon py-4 rounded-xl font-display tracking-widest uppercase text-sm">
                        Оформить заказ
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {totalItems > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden btn-neon px-6 py-3 rounded-full flex items-center gap-3 z-40 shadow-2xl"
        >
          <Icon name="ShoppingCart" size={18} />
          <span className="font-display tracking-wide">{totalItems} — {totalPrice} ₽</span>
        </button>
      )}
    </div>
  );
};

export default Index;