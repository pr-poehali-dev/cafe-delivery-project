import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/065d3492-188e-4a88-aec6-8f5d0527832f/files/fa12a1db-fe44-4b90-8d2b-37665014ace2.jpg';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  priceAlt?: string;
  weight?: string;
  emoji: string;
  category: string;
  badge?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU: MenuItem[] = [
  { id: 1, name: 'Маргарита', description: 'Томатный соус, моцарелла, свежий базилик', price: 490, emoji: '🍕', category: 'Пицца большая', badge: 'ХИТ' },
  { id: 2, name: 'Пепперони', description: 'Острая салями, моцарелла, томатный соус', price: 580, weight: '450 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 19, name: 'Сырная', description: 'Четыре вида сыра, сливочный соус, орегано', price: 450, weight: '380 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 20, name: 'Европейская', description: 'куриное филе, колбаса, ветчина, овощи, томатный соус, сыр', price: 580, weight: '515 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 21, name: 'Чизбургер', description: 'говядина, свинина, бекон, помидоры, солёные огурцы, сыр моцарелла и чеддер', price: 620, weight: '580 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 22, name: 'Верона', description: 'куриная грудка, бекон, помидоры, сыр, ореховый соус', price: 570, weight: '520 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 23, name: 'Чоризо острая', description: 'колбаски чоризо, халапеньо, сыр моцарелла, томатный соус', price: 570, weight: '470 г', emoji: '🍕', category: 'Пицца большая', badge: 'ОСТРАЯ' },
  { id: 24, name: 'С колбасой Московская', description: '', price: 520, weight: '450 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 25, name: 'Ассорти', description: 'колбаса, грибы, помидор, болгарский перец, томатный соус, сыр', price: 570, weight: '580 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 26, name: 'Морская', description: 'кальмар, креветки, мидии, майонез, маслины, сыр', price: 670, weight: '550 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 27, name: 'Зима-лето', description: 'куриная грудка, яблоко, болгарский перец, колбаса, помидоры, грибы, сыр', price: 570, weight: '510 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 28, name: 'С курицей и грибами', description: 'маслины, майонез, сыр', price: 570, weight: '550 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 29, name: 'Гавайская', description: 'ветчина, ананас, болгарский перец, майонез, сыр', price: 570, weight: '580 г', emoji: '🍕', category: 'Пицца большая' },
  { id: 1, name: 'Маргарита', description: 'Томатный соус, моцарелла, свежий базилик', price: 490, emoji: '🍕', category: 'Пицца большая', badge: 'ХИТ' },
  { id: 17, name: 'Маргарита мини', description: 'Томатный соус, моцарелла, свежий базилик', price: 290, emoji: '🍕', category: 'Пицца маленькая' },
  { id: 18, name: 'Пепперони мини', description: 'Острая салями, моцарелла, томатный соус', price: 330, weight: '240 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 30, name: 'Сырная мини', description: 'Четыре вида сыра, сливочный соус, орегано', price: 250, weight: '220 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 31, name: 'Европейская мини', description: 'куриное филе, колбаса, ветчина, овощи, томатный соус, сыр', price: 580, weight: '515 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 32, name: 'Чизбургер мини', description: 'говядина, свинина, бекон, помидоры, солёные огурцы, сыр', price: 370, weight: '300 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 33, name: 'Верона мини', description: 'куриная грудка, бекон, помидоры, сыр, ореховый соус', price: 320, weight: '270 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 34, name: 'Чоризо острая мини', description: 'колбаски чоризо, халапеньо, сыр моцарелла, томатный соус', price: 320, weight: '250 г', emoji: '🍕', category: 'Пицца маленькая', badge: 'ОСТРАЯ' },
  { id: 35, name: 'Московская мини', description: '', price: 300, weight: '240 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 36, name: 'Ассорти мини', description: 'колбаса, грибы, помидор, болгарский перец, томатный соус, сыр', price: 320, weight: '270 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 37, name: 'Морская мини', description: 'кальмар, креветки, мидии, майонез, маслины, сыр', price: 370, weight: '270 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 38, name: 'Зима-лето мини', description: 'куриная грудка, яблоко, болгарский перец, колбаса, помидоры, грибы, сыр', price: 320, weight: '250 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 39, name: 'С курицей и грибами мини', description: 'маслины, майонез, сыр', price: 320, weight: '270 г', emoji: '🍕', category: 'Пицца маленькая' },
  { id: 40, name: 'Гавайская мини', description: 'ветчина, ананас, болгарский перец, майонез, сыр', price: 320, weight: '270 г', emoji: '🍕', category: 'Пицца маленькая' },
  // Горячие закуски
  { id: 3, name: 'Жульен с курицей и грибами', description: '', price: 170, weight: '110 г', emoji: '🍲', category: 'Горячие закуски' },
  { id: 4, name: 'Жульен грибной', description: '', price: 170, weight: '130 г', emoji: '🍲', category: 'Горячие закуски' },
  { id: 300, name: 'Жульен с креветками и кальмаром', description: '', price: 260, weight: '95 г', emoji: '🍲', category: 'Горячие закуски' },
  { id: 301, name: 'Медальоны из кальмара', description: 'в чесночно-соевом соусе', price: 290, weight: '100/30 г', emoji: '🦑', category: 'Горячие закуски' },
  { id: 302, name: 'Кольца кальмара фри', description: '', price: 240, weight: '100 г', emoji: '🦑', category: 'Горячие закуски' },
  { id: 303, name: 'Мойва жареная', description: '', price: 250, weight: '200 г', emoji: '🐟', category: 'Горячие закуски' },
  { id: 304, name: 'Креветки жареные острые', description: '', price: 260, weight: '100/10 г', emoji: '🦐', category: 'Горячие закуски' },
  { id: 305, name: 'Креветки отварные', description: '', price: 260, weight: '100/10 г', emoji: '🦐', category: 'Горячие закуски' },
  { id: 306, name: 'Рёбрышки свиные', description: 'в медово томатном соусе с кунжутом', price: 420, weight: '250 г', emoji: '🍖', category: 'Горячие закуски' },
  { id: 307, name: 'Гренки чесночные', description: '', price: 110, weight: '100 г', emoji: '🍞', category: 'Горячие закуски' },
  { id: 308, name: 'Крылышки фри', description: '', price: 270, weight: '180 г', emoji: '🍗', category: 'Горячие закуски' },
  { id: 309, name: 'Крылышки в панировке', description: '', price: 290, weight: '340 г', emoji: '🍗', category: 'Горячие закуски' },
  { id: 310, name: 'Куриные стрипсы в панировке', description: '', price: 260, weight: '150 г', emoji: '🍗', category: 'Горячие закуски' },
  { id: 311, name: 'Кольца кальмара в панировке', description: '', price: 230, weight: '150 г', emoji: '🦑', category: 'Горячие закуски' },
  { id: 312, name: 'Луковые кольца фри', description: '', price: 150, weight: '100 г', emoji: '🧅', category: 'Горячие закуски' },

  // Холодные закуски
  { id: 5, name: 'Мясное ассорти', description: 'колбаса, ветчина, язык отварной', price: 320, weight: '150 г', emoji: '🥩', category: 'Холодные закуски' },
  { id: 6, name: 'Рыбное ассорти', description: 'форель с/с, сом х/к', price: 370, weight: '150 г', emoji: '🐟', category: 'Холодные закуски' },
  { id: 320, name: 'Овощное ассорти', description: 'помидор, огурец, перец, картофель', price: 160, weight: '140 г', emoji: '🥗', category: 'Холодные закуски' },
  { id: 321, name: 'Маслины', description: '', price: 100, weight: '70 г', emoji: '🫒', category: 'Холодные закуски' },
  { id: 322, name: 'Помидоры с сыром фета с соусом бальзамик', description: '', price: 160, weight: '140 г', emoji: '🍅', category: 'Холодные закуски' },
  { id: 323, name: 'Баклажаны маренго', description: 'морковь, чеснок, майонез', price: 170, weight: '150/30 г', emoji: '🍆', category: 'Холодные закуски' },
  { id: 324, name: 'Баклажаны пикантные', description: 'помидор, перец, майонез', price: 170, weight: '120/7 г', emoji: '🍆', category: 'Холодные закуски' },
  { id: 325, name: 'Шампиньоны малосольные', description: '', price: 150, weight: '100 г', emoji: '🍄', category: 'Холодные закуски' },
  { id: 326, name: 'Нарезка из слабосолёной сёмги', description: '', price: 420, weight: '75/20/10 г', emoji: '🐟', category: 'Холодные закуски' },
  { id: 327, name: 'Сельдь с луком', description: '', price: 190, weight: '100/20/20 г', emoji: '🐟', category: 'Холодные закуски' },
  { id: 328, name: 'Сельдь с картофелем и луком', description: '', price: 230, weight: '100/100/45 г', emoji: '🐟', category: 'Холодные закуски' },
  { id: 329, name: 'Сырная тарелка', description: 'чеддер, фета, моцарелла, пармезан', price: 370, weight: '120/20/20 г', emoji: '🧀', category: 'Холодные закуски' },

  // Салаты
  { id: 7, name: 'Цезарь с тигровыми креветками', description: '', price: 380, weight: '225 г', emoji: '🥗', category: 'Салаты' },
  { id: 8, name: 'Цезарь с курицей', description: '', price: 320, weight: '225 г', emoji: '🥗', category: 'Салаты' },
  { id: 330, name: 'С слабосоленой сёмгой', description: '', price: 360, weight: '210 г', emoji: '🥗', category: 'Салаты' },
  { id: 331, name: 'С телятиной', description: 'лист салата, свежие овощи, кунжут, пикантная заправка', price: 320, weight: '210 г', emoji: '🥗', category: 'Салаты' },
  { id: 332, name: 'С индейкой в кисло-сладком соусе', description: 'лист салата, свежие овощи, кунжут', price: 320, weight: '260 г', emoji: '🥗', category: 'Салаты' },
  { id: 333, name: 'С жареными баклажанами', description: 'лист салата, помидоры, сыр фета, кунжут', price: 260, weight: '220 г', emoji: '🥗', category: 'Салаты' },
  { id: 334, name: 'Морской коктейль', description: 'креветки, мидии, кальмар, крабовые палочки, помидор, майонез', price: 260, weight: '150 г', emoji: '🥗', category: 'Салаты' },
  { id: 335, name: 'Морская сказка', description: 'креветки, яйцо, свежий огурец, рис, мидии, майонез', price: 260, weight: '160 г', emoji: '🥗', category: 'Салаты' },
  { id: 336, name: 'Деликатесный', description: 'язык отварной, зеленый горошек, яйцо', price: 220, weight: '120 г', emoji: '🥗', category: 'Салаты' },
  { id: 337, name: 'Мясной', description: 'говядина, картофель, морковь, соленый огурец, майонез', price: 220, weight: '150 г', emoji: '🥗', category: 'Салаты' },
  { id: 338, name: 'Итальянская закуска', description: 'бекон, помидор, огурец, картофель, сыр, яйцо', price: 220, weight: '235 г', emoji: '🥗', category: 'Салаты' },
  { id: 339, name: 'Майский', description: 'говядина, огурец, помидор, зеленый горошек, майонез', price: 220, weight: '110 г', emoji: '🥗', category: 'Салаты' },
  { id: 340, name: 'Греческий', description: '', price: 220, weight: '215 г', emoji: '🥗', category: 'Салаты' },
  { id: 341, name: 'Датский с ветчиной', description: 'говядина, яйцо, помидор, грецкие орехи, гренки, майонез', price: 220, weight: '140 г', emoji: '🥗', category: 'Салаты' },
  { id: 342, name: 'Морская свежесть', description: 'кальмар, кукуруза, яйцо, майонез', price: 190, weight: '115 г', emoji: '🥗', category: 'Салаты' },
  { id: 343, name: 'Морское дно', description: 'кальмар, болгарский перец, свежий огурец, майонез', price: 170, weight: '100 г', emoji: '🥗', category: 'Салаты' },
  { id: 344, name: 'С кальмаром', description: 'яйцо, огурец, майонез', price: 170, weight: '100 г', emoji: '🥗', category: 'Салаты' },
  { id: 345, name: 'Оливье классический', description: '', price: 160, weight: '150 г', emoji: '🥗', category: 'Салаты' },
  { id: 346, name: 'Летний', description: 'помидор, огурец, болгарский перец', price: 150, weight: '200 г', emoji: '🥗', category: 'Салаты' },
  { id: 347, name: 'Европейский', description: 'курица, грибы жареные с луком, огурец, болгарский перец, майонез', price: 150, weight: '115 г', emoji: '🥗', category: 'Салаты' },
  { id: 348, name: 'Из крабовых палочек', description: 'кукуруза, яйцо, майонез', price: 130, weight: '110 г', emoji: '🥗', category: 'Салаты' },
  { id: 349, name: 'Винегрет с селёдочкой', description: '', price: 110, weight: '140/25 г', emoji: '🥗', category: 'Салаты' },

  // Супы
  { id: 9, name: 'Солянка домашняя', description: '', price: 260, weight: '305/20/15 г', emoji: '🍲', category: 'Супы' },
  { id: 10, name: 'Окрошка домашняя', description: '', price: 170, weight: '400 г', emoji: '🍲', category: 'Супы' },
  { id: 350, name: 'Лапша домашняя', description: '', price: 180, weight: '250/25 г', emoji: '🍜', category: 'Супы' },
  { id: 351, name: 'Борщ с мясом', description: '', price: 190, weight: '275/15/35 г', emoji: '🍲', category: 'Супы' },
  { id: 352, name: 'Крем-суп из шампиньонов', description: '', price: 200, weight: '250/25 г', emoji: '🍄', category: 'Супы' },
  { id: 353, name: 'Уха из форели', description: '', price: 260, weight: '250/25 г', emoji: '🐟', category: 'Супы' },

  // Горячие блюда
  { id: 11, name: 'Жаркое аппетитное', description: 'свинина, картофель, шампиньоны, лук, чеснок', price: 340, weight: '380 г', emoji: '🥘', category: 'Горячие блюда' },
  { id: 360, name: 'Жаркое домашнее с говядиной', description: 'бекон, помидор, фасоль, картофель, лук, морковь, чеснок', price: 360, weight: '380 г', emoji: '🥘', category: 'Горячие блюда' },
  { id: 361, name: 'Жаркое ароматное с куриным филе', description: 'помидор, болгарский перец, картофель, лук, морковь, чеснок', price: 320, weight: '380 г', emoji: '🥘', category: 'Горячие блюда' },
  { id: 362, name: 'Жаркое по-восточному из свинины', description: 'болгарский перец, баклажан, помидоры, шампиньоны, лук, картофель, чеснок', price: 360, weight: '380 г', emoji: '🥘', category: 'Горячие блюда' },
  { id: 363, name: 'Шашлык из свинины с гарниром', description: 'печёный картофель, маринованные огурчики, помидор', price: 430, weight: '150/150/110 г', emoji: '🍢', category: 'Горячие блюда' },
  { id: 364, name: 'Шашлык земля и море с гарниром', description: 'тигровые креветки, куриное филе, печёный картофель', price: 470, weight: '100/150/90 г', emoji: '🍢', category: 'Горячие блюда' },
  { id: 365, name: 'Свинина по-меньшиковски с грибами и луком', description: '', price: 390, weight: '160 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 366, name: 'Свинина по-французски с луком', description: '', price: 370, weight: '160 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 367, name: 'Свинина пикантная с помидором', description: '', price: 370, weight: '160 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 368, name: 'Свинина запечённая с черносливом', description: 'болгарский перец, помидор, картофель, сыр', price: 390, weight: '320 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 369, name: 'Стейк из свинины везувий', description: '', price: 370, weight: '150 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 370, name: 'Свинина по-пекински', description: 'перец болгарский, баклажаны, грибы в винном соусе с рисом и кунжутом', price: 390, weight: '450 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 371, name: 'Свиная рулька в соусе на выбор', description: 'томатно чесночном / имбирном', price: 690, weight: '1 шт.', emoji: '🍖', category: 'Горячие блюда' },
  { id: 372, name: 'Бифштекс из свинины', description: '', price: 220, weight: '140 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 373, name: 'Стейк из говяжей вырезки', description: 'с печеным картофелем и соусом бальзамик', price: 650, weight: '120/75/10 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 374, name: 'Говядина филе', description: 'в персиково-соевом соусе с цветной капустой', price: 730, weight: '200/250 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 375, name: 'Рулет из говядины с грибами и сыром', description: 'с печёным картофелем', price: 690, weight: '140/35/75 г', emoji: '🥩', category: 'Горячие блюда' },
  { id: 376, name: 'Куриное филе запечёное', description: 'ветчина, помидор, сыр', price: 320, weight: '180 г', emoji: '🍗', category: 'Горячие блюда' },
  { id: 377, name: 'Курица по-купечески с апельсином', description: 'в орехо-панировочной смеси с зелёным горошком', price: 320, weight: '150/50/30 г', emoji: '🍗', category: 'Горячие блюда' },
  { id: 378, name: 'Курица по-итальянски', description: 'болгарский перец, помидор, базилик, майонез, сыр', price: 320, weight: '170 г', emoji: '🍗', category: 'Горячие блюда' },
  { id: 379, name: 'Котлеты из рубленой куриной грудки', description: '', price: 260, weight: '150 г', emoji: '🍗', category: 'Горячие блюда' },
  { id: 380, name: 'Паста с грибами и ветчиной', description: '', price: 290, weight: '210/130/10 г', emoji: '🍝', category: 'Горячие блюда' },

  // Горячие блюда из морепродуктов
  { id: 390, name: 'Кальмар фаршированный', description: 'грибы, яйцо, майонез, сыр', price: 280, weight: '145 г', emoji: '🦑', category: 'Морепродукты' },
  { id: 391, name: 'Филе судака запечённое', description: 'чернослив, бекон, картофель, сырный соус', price: 420, weight: '200/150/100/50 г', emoji: '🐟', category: 'Морепродукты' },
  { id: 392, name: 'Стейк из форели', description: '', price: 720, weight: '160/20 г', emoji: '🐟', category: 'Морепродукты' },
  { id: 393, name: 'Форель запечённая', description: 'грибы, лук, майонез, сыр', price: 620, weight: '175 г', emoji: '🐟', category: 'Морепродукты' },
  { id: 394, name: 'Форель в картофельной корочке', description: 'свежие овощи, зеленый горошек, сырный соус', price: 640, weight: '200/100/65 г', emoji: '🐟', category: 'Морепродукты' },
  { id: 395, name: 'Форель в соусе терияки', description: 'стручковая фасоль, грибы, помидор, майонез', price: 740, weight: '160/100/10 г', emoji: '🐟', category: 'Морепродукты' },
  { id: 396, name: 'Зубатка запечённая с картофелем и помидором', description: '', price: 370, weight: '390 г', emoji: '🐟', category: 'Морепродукты' },
  { id: 397, name: 'Зубатка жареная', description: '', price: 270, weight: '200 г', emoji: '🐟', category: 'Морепродукты' },
  { id: 398, name: 'Окунь морской жареный', description: '', price: 470, weight: '1 шт./40/7 г', emoji: '🐟', category: 'Морепродукты' },

  // Гарниры
  { id: 15, name: 'Картофель фри', description: '', price: 100, weight: '100 г', emoji: '🍟', category: 'Гарниры' },
  { id: 410, name: 'Сложный гарнир из овощей', description: 'кукуруза, горошек, помидоры, огурцы, маслины, картофель фри, салат из капусты, фасоль, перец болгарский зелень', price: 270, weight: '270 г', emoji: '🥗', category: 'Гарниры' },
  { id: 411, name: 'Рис отварной', description: 'с помидором и огурцом', price: 100, weight: '100/50/30 г', emoji: '🍚', category: 'Гарниры' },
  { id: 412, name: 'Картофель отварной', description: '', price: 100, weight: '150 г', emoji: '🥔', category: 'Гарниры' },
  { id: 413, name: 'Картофель печёный', description: 'с маринованным помидором и огурцом', price: 170, weight: '150/80/7 г', emoji: '🥔', category: 'Гарниры' },
  { id: 414, name: 'Жареный картофель с грибами с луком', description: '', price: 170, weight: '150/50 г', emoji: '🥔', category: 'Гарниры' },
  { id: 415, name: 'Цветная капуста жареная', description: '', price: 150, weight: '170 г', emoji: '🥦', category: 'Гарниры' },
  { id: 416, name: 'Картофель тушённый с баклажаном и помидором', description: '', price: 170, weight: '220 г', emoji: '🥔', category: 'Гарниры' },
  { id: 16, name: 'Рис с овощами', description: 'Пропаренный рис, сезонные овощи, зелень', price: 160, emoji: '🍚', category: 'Гарниры' },

  // Десерты
  { id: 50, name: 'Санди', description: 'мороженое, киви, банан, шоколад, грецкий орех', price: 220, weight: '165 г', emoji: '🍨', category: 'Десерты' },
  { id: 51, name: 'Банановые облачка', description: 'тёплый десерт с клубничным сиропом', price: 170, weight: '165 г', emoji: '🍌', category: 'Десерты' },
  { id: 52, name: 'Блинчики по-карибски', description: 'ананас, мороженое, клубничный сироп', price: 190, weight: '250 г', emoji: '🥞', category: 'Десерты' },
  { id: 53, name: 'Блинчики с шоколадом', description: '', price: 190, weight: '150/30/30 г', emoji: '🥞', category: 'Десерты' },
  { id: 54, name: 'Блинчики с фруктами', description: '', price: 190, weight: '150/20 г', emoji: '🥞', category: 'Десерты' },
  { id: 55, name: 'Шоколадная плитка', description: '', price: 140, weight: '1 шт', emoji: '🍫', category: 'Десерты' },
  { id: 56, name: 'Пирожное Йогуртовое', description: '', price: 220, weight: '110 г', emoji: '🍰', category: 'Десерты' },
  { id: 57, name: 'Пирожное Творожное', description: '', price: 220, weight: '140 г', emoji: '🍰', category: 'Десерты' },
  { id: 58, name: 'Пирожное Банановое', description: '', price: 220, weight: '130 г', emoji: '🍰', category: 'Десерты' },
  { id: 59, name: 'Пирожное Шоколадный мусс', description: '', price: 220, weight: '110 г', emoji: '🍰', category: 'Десерты' },

  // Мороженое
  { id: 60, name: 'Пломбир с сиропом', description: 'шоколад, карамель, лесная ягода, ананас, клубника, малина, вишня', price: 260, weight: '100/25 г', emoji: '🍦', category: 'Мороженое' },
  { id: 61, name: 'Пломбир вкусовой', description: 'ванильный, шоколад, фисташка, чёрная смородина, клубника', price: 210, weight: '100 г', emoji: '🍦', category: 'Мороженое' },

  // Наполнители
  { id: 70, name: 'Персик консервированный', description: '', price: 50, weight: '20 г', emoji: '🍑', category: 'Наполнители' },
  { id: 71, name: 'Ананас консервированный', description: '', price: 50, weight: '20 г', emoji: '🍍', category: 'Наполнители' },
  { id: 72, name: 'Грецкий орех', description: '', price: 50, weight: '20 г', emoji: '🌰', category: 'Наполнители' },
  { id: 73, name: 'Банан', description: '', price: 50, weight: '20 г', emoji: '🍌', category: 'Наполнители' },
  { id: 74, name: 'Апельсин', description: '', price: 50, weight: '20 г', emoji: '🍊', category: 'Наполнители' },
  { id: 75, name: 'Киви', description: '', price: 50, weight: '20 г', emoji: '🥝', category: 'Наполнители' },
  { id: 76, name: 'Шоколад', description: '', price: 50, weight: '10 г', emoji: '🍫', category: 'Наполнители' },

  // Молочно-фруктовые коктейли
  { id: 80, name: 'Коктейль Киви', description: '', price: 230, weight: '250 мл', emoji: '🥤', category: 'Коктейли' },
  { id: 81, name: 'Коктейль Клубничный', description: '', price: 230, weight: '250 мл', emoji: '🥤', category: 'Коктейли' },
  { id: 82, name: 'Коктейль Банановый', description: '', price: 230, weight: '250 мл', emoji: '🥤', category: 'Коктейли' },

  // Горячие напитки
  { id: 90, name: 'Эспрессо', description: '', price: 80, weight: '50 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 91, name: 'Двойной эспрессо', description: '', price: 110, weight: '150 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 92, name: 'Американо', description: '', price: 110, weight: '150 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 93, name: 'Макиато', description: '', price: 90, weight: '50 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 94, name: 'Капучино', description: '', price: 140, weight: '150 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 95, name: 'Латте', description: '', price: 140, weight: '250 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 96, name: 'Латте с сиропом', description: 'шоколад, клубника, вишня', price: 150, weight: '250 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 97, name: 'Гляссе с шариком мороженого', description: '', price: 120, weight: '150 мл', emoji: '☕', category: 'Горячие напитки' },
  { id: 98, name: 'Чай пакетированный с сахаром и лимоном', description: 'в ассортименте', price: 50, weight: '200/15/7 г', emoji: '🍵', category: 'Горячие напитки' },
  { id: 99, name: 'Чай чёрный в чайнике с лимоном', description: 'в ассортименте', price: 100, weight: '450/15/5 г', emoji: '🍵', category: 'Горячие напитки' },
  { id: 100, name: 'Чай зелёный в чайнике с лимоном', description: 'в ассортименте', price: 100, weight: '450/15/5 г', emoji: '🍵', category: 'Горячие напитки' },

  // Напитки
  { id: 110, name: 'Сок в ассортименте', description: 'томат, грейпфрут, манго, персик, апельсин, яблоко, ананас, вишня, мультифрукт, виноград', price: 70, priceAlt: '350 ₽ / 1 л', weight: '0,2 л', emoji: '🧃', category: 'Напитки' },
  { id: 111, name: 'Свежевыжатые соки', description: 'апельсин/грейпфрут', price: 200, priceAlt: '250 ₽ / 0,4 л', weight: '0,2 л', emoji: '🍊', category: 'Напитки' },
  { id: 112, name: 'Лимонад Россия в ассортименте', description: '', price: 100, weight: '0,5 л', emoji: '🥤', category: 'Напитки' },
  { id: 113, name: 'Черноголовка Лимонад', description: 'стекло', price: 120, weight: '0,5 л', emoji: '🥤', category: 'Напитки' },
  { id: 114, name: 'Напиток газированный', description: 'розлив', price: 45, priceAlt: '90 ₽ / 0,5 л', weight: '0,25 л', emoji: '🥤', category: 'Напитки' },
  { id: 115, name: 'Черноголовка Кока-Кола', description: 'стекло', price: 200, weight: '0,5 л', emoji: '🥤', category: 'Напитки' },
  { id: 116, name: 'Черноголовка Кока-Кола', description: 'пэт', price: 140, weight: '0,5 л', emoji: '🥤', category: 'Напитки' },
  { id: 117, name: 'Добрый Кола/Фанта/Спрайт', description: '', price: 200, priceAlt: '140 ₽ / 0,5 л', weight: '1 л', emoji: '🥤', category: 'Напитки' },
  { id: 118, name: 'Добрый Кола/Фанта/Спрайт', description: '', price: 100, priceAlt: '50 ₽ / 0,25 л', weight: '0,33 л', emoji: '🥤', category: 'Напитки' },
  { id: 119, name: 'Burn', description: '', price: 200, weight: '0,45 л', emoji: '⚡', category: 'Напитки' },
  { id: 120, name: 'Липецкая минеральная вода', description: '', price: 60, weight: '0,5 л', emoji: '💧', category: 'Напитки' },
  { id: 121, name: 'Бонаква', description: '', price: 100, weight: '0,5 л', emoji: '💧', category: 'Напитки' },

  // Вина
  { id: 130, name: 'Шампанское Абрау-Дюрсо', description: 'брют п/сл', price: 800, weight: '0,75 л', emoji: '🥂', category: 'Вина' },
  { id: 131, name: 'Шампанское МКШВ', description: 'п/сл', price: 650, weight: '0,75 л', emoji: '🥂', category: 'Вина' },
  { id: 132, name: 'Мускат', description: '', price: 800, priceAlt: '60 ₽ / бокал', weight: '0,75/0,05 л', emoji: '🍷', category: 'Вина' },
  { id: 133, name: 'Гранде Momento', description: 'красное сухое и п/сл / белое сухое и п/сл (Россия)', price: 800, weight: '0,75 л', emoji: '🍷', category: 'Вина' },
  { id: 134, name: 'Джой Тинто', description: 'красное сухое (Аргентина)', price: 1550, priceAlt: '75 ₽ / бокал', weight: '1,125/0,05 л', emoji: '🍷', category: 'Вина' },
  { id: 135, name: 'Джой', description: 'белое сухое (Аргентина)', price: 1550, priceAlt: '75 ₽ / бокал', weight: '1,125/0,05 л', emoji: '🍷', category: 'Вина' },
  { id: 136, name: 'Кастилья', description: 'белое сухое и п/сл / красное сухое и п/сл', price: 1350, priceAlt: '50 ₽ / бокал', weight: '1,5/0,05 л', emoji: '🍷', category: 'Вина' },

  // Вина Грузии
  { id: 140, name: 'Киндзмараули', description: 'красное п/сл', price: 1000, priceAlt: '70 ₽ / бокал', weight: '0,75/0,05 л', emoji: '🍷', category: 'Вина Грузии' },
  { id: 141, name: 'Цинандали', description: 'белое сухое', price: 900, priceAlt: '60 ₽ / бокал', weight: '0,75/0,05 л', emoji: '🍷', category: 'Вина Грузии' },
  { id: 142, name: 'Алазанская долина', description: 'красное п/сл и белое п/сл', price: 900, priceAlt: '60 ₽ / бокал', weight: '0,75/0,05 л', emoji: '🍷', category: 'Вина Грузии' },

  // Пиво
  { id: 150, name: 'Монастырское', description: 'светлое фильтрованное', price: 110, priceAlt: '150 ₽ / 0,5 л', weight: '0,33/0,5 л', emoji: '🍺', category: 'Пиво' },
  { id: 151, name: 'Балтика 7', description: 'светлое фильтрованное', price: 100, priceAlt: '150 ₽ / 0,5 л', weight: '0,33/0,5 л', emoji: '🍺', category: 'Пиво' },
  { id: 152, name: 'Стефанбланш', description: 'пшеничное н/ф', price: 110, priceAlt: '160 ₽ / 0,5 л', weight: '0,33/0,5 л', emoji: '🍺', category: 'Пиво' },
  { id: 153, name: 'Крон Бланш Бир', description: 'пшеничное н/ф', price: 110, priceAlt: '170 ₽ / 0,5 л', weight: '0,33/0,5 л', emoji: '🍺', category: 'Пиво' },
  { id: 154, name: 'Пилзнер Премиум', description: 'светлое фильтрованное', price: 110, priceAlt: '150 ₽ / 0,5 л', weight: '0,33/0,5 л', emoji: '🍺', category: 'Пиво' },
  { id: 155, name: 'Балтика Портер', description: 'тёмное фильтрованное', price: 120, priceAlt: '170 ₽ / 0,5 л', weight: '0,33/0,5 л', emoji: '🍺', category: 'Пиво' },
  { id: 156, name: 'Черри Найт', description: 'вишнёвое', price: 140, priceAlt: '190 ₽ / 0,5 л', weight: '0,33/0,5 л', emoji: '🍺', category: 'Пиво' },

  // Фирменные настойки
  { id: 160, name: 'Фирменные настойки в ассортименте', description: 'уточняйте на баре', price: 1500, priceAlt: '150 ₽ / 0,05 л', weight: '0,5/0,05 л', emoji: '🍶', category: 'Настойки' },

  // Аперитивы
  { id: 165, name: 'Мартини Бьянко', description: '', price: 3000, priceAlt: '150 ₽ / бокал', weight: '1 л/0,05 л', emoji: '🍸', category: 'Аперитивы' },
  { id: 166, name: 'Мартини Драй', description: '', price: 3000, priceAlt: '150 ₽ / бокал', weight: '1 л/0,05 л', emoji: '🍸', category: 'Аперитивы' },
  { id: 167, name: 'Мартини Россо', description: '', price: 3000, priceAlt: '150 ₽ / бокал', weight: '1 л/0,05 л', emoji: '🍸', category: 'Аперитивы' },

  // Виски
  { id: 170, name: 'Джемесон', description: '', price: 2700, priceAlt: '270 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Виски' },
  { id: 171, name: 'Рэд Лэйбл', description: '', price: 1800, priceAlt: '180 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Виски' },
  { id: 172, name: 'Баллантайнс', description: '', price: 2200, priceAlt: '220 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Виски' },
  { id: 173, name: 'Джим Бим', description: '', price: 2200, priceAlt: '220 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Виски' },
  { id: 174, name: 'Уильям Лоусонс', description: '', price: 1600, priceAlt: '160 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Виски' },

  // Коньяк
  { id: 180, name: 'Старейшина 7 звёзд', description: '', price: 1600, priceAlt: '160 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Коньяк' },
  { id: 181, name: 'Коктебель 5 звёзд', description: '', price: 1600, priceAlt: '160 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Коньяк' },
  { id: 182, name: 'Арарат 3 звезды', description: '', price: 1800, priceAlt: '180 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Коньяк' },
  { id: 183, name: 'Арарат 5 звёзд', description: '', price: 2200, priceAlt: '220 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Коньяк' },
  { id: 184, name: 'Великая династия 5 звёзд', description: '', price: 1600, priceAlt: '160 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Коньяк' },

  // Водка
  { id: 190, name: 'Русский стандарт', description: '', price: 1000, priceAlt: '100 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 191, name: 'Сибирский экспресс', description: '', price: 1300, priceAlt: '130 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 192, name: 'Мороша', description: '', price: 800, priceAlt: '80 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 193, name: 'Пять озёр', description: '', price: 800, priceAlt: '80 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 194, name: 'Хаски', description: '', price: 800, priceAlt: '80 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 195, name: 'Хаски Ягодный микс', description: '', price: 800, priceAlt: '80 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 196, name: 'Хорта', description: '', price: 800, priceAlt: '80 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 197, name: 'Белая берёзка', description: '', price: 850, priceAlt: '85 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 198, name: 'Беленькая', description: '', price: 850, priceAlt: '85 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },
  { id: 199, name: 'Талка', description: '', price: 850, priceAlt: '85 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🍾', category: 'Водка' },

  // Текила
  { id: 200, name: 'Рио Гранд', description: 'золотая / серебреная', price: 1300, priceAlt: '130 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Текила' },

  // Ром
  { id: 205, name: 'Барсело Гран Аньехо', description: '', price: 1750, priceAlt: '175 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Ром' },
  { id: 206, name: 'Бакарди Оакхарт', description: '', price: 1900, priceAlt: '190 ₽ / рюмка', weight: '0,5/0,05 л', emoji: '🥃', category: 'Ром' },
];

const CATEGORIES = [
  'Все', 'Пицца',
  'Горячие закуски', 'Холодные закуски', 'Салаты', 'Супы',
  'Горячие блюда', 'Морепродукты',
  'Гарниры',
  'Десерты', 'Мороженое', 'Наполнители', 'Коктейли',
  'Горячие напитки', 'Напитки',
  'Вина', 'Вина Грузии', 'Пиво', 'Настойки', 'Аперитивы',
  'Виски', 'Коньяк', 'Водка', 'Текила', 'Ром',
];
const PIZZA_SUBCATEGORIES = ['Пицца большая', 'Пицца маленькая'];

const NAV_LINKS = [
  { label: 'Главная', href: '#hero' },
  { label: 'Меню', href: '#menu' },
  { label: 'Доставка', href: '#delivery' },
  { label: 'Контакты', href: '#contacts' },
];

const MenuCard = ({ item, inCart, i, menuVisible, onAdd, onRemove }: {
  item: MenuItem;
  inCart: CartItem | undefined;
  i: number;
  menuVisible: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) => (
  <div
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
    <div className="p-4 flex flex-col h-[calc(100%-9rem)]">
      <div className="font-display text-base font-semibold uppercase tracking-wide mb-1">{item.name}</div>
      {item.weight && <div className="font-rubik text-[11px] text-white/30 mb-1">{item.weight}</div>}
      {item.description && <div className="font-rubik text-xs text-white/40 mb-3 leading-relaxed">{item.description}</div>}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="font-display text-lg font-bold text-[var(--neon-orange)]">{item.price} ₽</span>
          {item.priceAlt && <div className="font-rubik text-[11px] text-white/30">{item.priceAlt}</div>}
        </div>
        {inCart ? (
          <div className="flex items-center gap-2">
            <button onClick={onRemove} className="w-7 h-7 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="Minus" size={12} />
            </button>
            <span className="font-display text-sm w-4 text-center">{inCart.quantity}</span>
            <button onClick={onAdd} className="w-7 h-7 rounded-full bg-[var(--neon-orange)] flex items-center justify-center hover:bg-[var(--neon-orange)]/80 transition-colors">
              <Icon name="Plus" size={12} />
            </button>
          </div>
        ) : (
          <button onClick={onAdd} className="w-8 h-8 rounded-full btn-neon flex items-center justify-center">
            <Icon name="Plus" size={14} />
          </button>
        )}
      </div>
    </div>
  </div>
);

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
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundImage: 'url(https://cdn.poehali.dev/projects/065d3492-188e-4a88-aec6-8f5d0527832f/bucket/977de0e3-ebbf-4f1c-976c-ab51c29749c2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
      }}
    >
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'rgba(10,6,2,0.82)' }}>

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
                        <MenuCard key={item.id} item={item} inCart={inCart} i={i} menuVisible={menuVisible} onAdd={() => addToCart(item)} onRemove={() => removeFromCart(item.id)} />
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
                <MenuCard key={item.id} item={item} inCart={inCart} i={i} menuVisible={menuVisible} onAdd={() => addToCart(item)} onRemove={() => removeFromCart(item.id)} />
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
    </div>
  );
};

export default Index;