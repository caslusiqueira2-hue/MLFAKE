import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import mercadoLivreLogo from "@/assets/mercado-livre.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "Álbum Copa Do Mundo Fifa 2026 Capa Dura + 70 Figurinhas | Frete grátis",
    meta: [
      {
        name: "description",
        content:
          "Frete grátis com entrega no mesmo dia. Compre online com segurança - Álbum Copa Do Mundo Fifa 2026 Capa Dura + 70 Figurinhas.",
      },
    ],
  }),
});

function Index() {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);

  const DEFAULT_CONTENT = {
    title: "Álbum Copa Do Mundo Fifa 2026 Capa Dura + 70 Figurinhas",
    oldPrice: "59,90",
    currentPrice: "19,90",
    discount: "50% OFF",
    installments: "10x R$ 1,99",
    rating: 4.8,
    reviewsCount: 1247,
    gallery: [
      "https://http2.mlstatic.com/D_NQ_NP_2X_709642-MLA110297646386_052026-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_844327-MLA110297855066_052026-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_702521-MLA111227518315_052026-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_846259-MLB111299107337_052026-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_635211-MLB111229086231_052026-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_745845-MLB110416296214_052026-O.webp",
    ],
    features: [
      { label: "Idade mínima recomendada", value: "5 anos" },
      { label: "Quantidade de pacotes de figurinhas", value: "10" },
      { label: "Tipo de capa", value: "Dura" },
      { label: "Quantidade de páginas", value: "112" },
      { label: "Quantidade de figurinhas total", value: "980" },
      { label: "Figurinhas inclusas", value: "70" },
      { label: "Largura", value: "23 cm" },
      { label: "Altura", value: "27 cm" },
    ],
    description: [
      "O Álbum Copa do Mundo FIFA 2026 traz toda a emoção do maior torneio de futebol do mundo em uma estrutura de 112 páginas planejada para receber até 980 figurinhas oficiais. Capa dura em formato 27 cm × 23 cm, ideal para colecionadores de todas as idades.",
      "O kit acompanha 10 envelopes lacrados com 7 figurinhas cada, totalizando 70 cromos para iniciar a coleção. As páginas são divididas por seleções, estádios, mascote e momentos históricos da competição.",
      "Produto licenciado oficialmente, perfeito para presentear crianças, adolescentes e adultos apaixonados por futebol. Garantia de 3 meses contra defeitos de fabricação e devolução grátis em até 30 dias.",
    ],
    reviews: [
      { name: "Carla M.", date: "08 mai. 2026", stars: 5, text: "Álbum lindo, capa de boa qualidade e as figurinhas vieram bem lacradas. Meu filho adorou!" },
      { name: "Roberto P.", date: "02 mai. 2026", stars: 5, text: "Chegou rápido com o Mercado Full. Recomendo, produto oficial mesmo." },
      { name: "Juliana S.", date: "29 abr. 2026", stars: 4, text: "Gostei bastante, só achei que poderia vir com mais pacotes. De resto, ótimo!" },
    ],
    color: "Amarelo (Capa Dura)",
    seller: "FIGURINHAS BRASIL",
    sellerInfo: "+1.000 vendas · MercadoLíder Platinum",
    availability: "Estoque disponível",
    delivery: "Chegará grátis amanhã",
    deliveryMobile: "Chegará entre terça-feira e sexta-feira",
    purchaseLink: "https://www.mercadolivre.com.br",
  };

  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    const savedContent = localStorage.getItem("site_content");
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("site_content", JSON.stringify(content));
    setIsAdminMode(false);
  };

  const updateField = (field: string, value: any) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (field: string, index: number, subfield: string, value: any) => {
    setContent((prev: any) => {
      const newArray = [...prev[field]];
      newArray[index] = { ...newArray[index], [subfield]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const updateArrayItem = (field: string, index: number, value: any) => {
    setContent((prev: any) => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const EditableText = ({ value, onChange, className = "", multiline = false, type = "text" }: any) => {
    if (!isAdminMode) return <span className={className}>{value}</span>;
    
    const commonProps = {
      value: value,
      onChange: (e: any) => onChange(e.target.value),
      className: `w-full border-2 border-dashed border-[#3483fa] p-1 bg-white outline-none focus:border-solid transition-all ${className}`,
    };

    return multiline ? <textarea {...commonProps} rows={3} /> : <input type={type} {...commonProps} />;
  };

  const EditableImage = ({ src, onUpdate, className = "" }: any) => {
    return (
      <div className={`relative group ${className}`}>
        <img src={src} className="h-full w-full object-contain" alt="" />
        {isAdminMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const newUrl = prompt("Insira a nova URL da imagem:", src);
                if (newUrl) onUpdate(newUrl);
              }}
              className="bg-white text-[#3483fa] px-3 py-1 rounded-md text-[12px] font-bold shadow-lg"
            >
              Trocar Imagem
            </button>
          </div>
        )}
      </div>
    );
  };

  const handleAdminClick = () => {
    const newClicks = adminClicks + 1;
    if (newClicks >= 3) {
      setIsAdminMode(!isAdminMode);
      setAdminClicks(0);
    } else {
      setAdminClicks(newClicks);
    }
  };

  const MENU_ITEMS = [
    "Crie sua conta",
    "Entre",
    "Comprar",
    "Categorias",
    "Ofertas",
    "Cupons",
    "Supermercado",
    "Moda",
    "Mercado Play",
    "Vender",
    "Contato",
  ];

  return (
    <div className="min-h-screen bg-[#ebebeb] text-[#333] [font-family:'Proxima_Nova','Helvetica_Neue',Arial,sans-serif]">
       {/* Top Header */}
       <header className="sticky top-0 z-50 bg-[#FFE700] shadow-sm">
         <div className="mx-auto max-w-[1200px] px-4">
           {/* Main Header Row */}
           <div className="flex h-12 md:h-14 items-center gap-4 py-1">
              <a href="/" className="shrink-0 flex items-center" aria-label="Mercado Livre - Página inicial">
               <img
                 src={mercadoLivreLogo}
                 alt="Mercado Livre"
                  className="h-5 md:h-7 w-auto object-contain"
               />
             </a>

             {/* Search Bar - Hidden on mobile, shown in row on desktop */}
             <form
               onSubmit={(e) => e.preventDefault()}
               className="hidden md:flex h-10 flex-1 items-center rounded-sm bg-white shadow-sm"
             >
               <input
                 type="text"
                 placeholder="Buscar produtos, marcas e muito mais…"
                 className="h-full flex-1 rounded-l-sm bg-transparent px-3 text-[15px] outline-none placeholder:text-[#999]"
               />
               <button className="flex h-full w-12 items-center justify-center border-l border-[#e6e6e6] text-[#666] hover:text-black">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
               </button>
             </form>

             {/* Hamburger Menu - Next to search bar */}
             <div className="relative">
               <button
                 onClick={() => setMenuOpen(!menuOpen)}
                 aria-label="Menu"
                 className="flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-md hover:bg-black/5 transition-colors"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
               </button>
               {menuOpen && (
                 <>
                   <div className="fixed inset-0 z-[90]" onClick={() => setMenuOpen(false)} />
                   <div className="absolute right-0 top-11 z-[100] w-[240px] rounded-md border border-[#e6e6e6] bg-white py-2 shadow-xl">
                     {MENU_ITEMS.map((item) => (
                       <a
                         key={item}
                         href="#"
                         onClick={() => setMenuOpen(false)}
                         className="block px-4 py-2.5 text-[14px] text-[#333] hover:bg-[#f5f5f5] transition-colors"
                       >
                         {item}
                       </a>
                     ))}
                   </div>
                 </>
               )}
             </div>

             {/* Mobile Icons / Desktop Auth */}
             <div className="flex flex-1 md:flex-none items-center justify-end gap-4 text-[14px] text-[#333]">
                <div className="relative">
                  <button
                    onClick={() => setCartOpen(!cartOpen)}
                    aria-label="Carrinho"
                    className="p-1 relative hover:bg-black/5 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3483fa] text-[10px] font-bold text-white">
                      {qty}
                    </span>
                  </button>

                  {cartOpen && (
                    <div className="absolute right-0 top-10 z-[100] w-[300px] rounded-md border border-[#e6e6e6] bg-white p-4 shadow-xl">
                      <div className="flex gap-3">
                         <EditableImage
                           src={content.gallery[0]}
                           onUpdate={(val: string) => updateArrayItem('gallery', 0, val)}
                           className="h-16 w-16 rounded border border-[#eee]"
                         />
                        <div className="flex-1">
                          <h4 className="text-[14px] font-semibold text-[#333] line-clamp-2 leading-tight">
                             <EditableText value={content.title} onChange={(val: string) => updateField('title', val)} />
                          </h4>
                          <div className="mt-1 text-[13px] text-[#666]">Quantidade: {qty}</div>
                           <div className="text-[15px] font-semibold text-[#333]">R$ {(parseFloat(content.currentPrice.replace(',', '.')) * qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <button 
                          onClick={() => window.open((content as any).purchaseLink || "#", '_blank')}
                          className="w-full rounded-md bg-[#3483fa] py-2.5 text-[14px] font-semibold text-white hover:bg-[#2968c8] transition-colors"
                        >
                          Finalizar compra
                        </button>
                        <button
                          onClick={() => setCartOpen(false)}
                          className="w-full py-1 text-[12px] text-[#3483fa] hover:underline"
                        >
                          Continuar comprando
                        </button>
                      </div>
                    </div>
                  )}
                </div>
             </div>
           </div>

           {/* Mobile Search Bar - Shown below logo on mobile */}
           <div className="md:hidden pb-3">
             <form
               onSubmit={(e) => e.preventDefault()}
               className="flex h-10 w-full items-center rounded-sm bg-white shadow-sm"
             >
               <input
                 type="text"
                 placeholder="Buscar no Mercado Livre"
                 className="h-full flex-1 rounded-l-sm bg-transparent px-3 text-[15px] outline-none placeholder:text-[#999]"
               />
               <button className="flex h-full w-12 items-center justify-center border-l border-[#e6e6e6] text-[#666]">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
               </button>
             </form>
           </div>

           {/* Navigation Links - Horizontal scroll on mobile */}
           <nav className="flex items-center gap-x-4 overflow-x-auto no-scrollbar pb-2 text-[12px] text-[#333] whitespace-nowrap">
             <a href="#" className="flex items-center gap-1 font-semibold shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Envio para todo o Brasil
             </a>
           </nav>
         </div>
       </header>

       {/* Breadcrumb - Truncated on mobile */}
       <div className="mx-auto max-w-[1200px] px-4 py-3 text-[12px] text-[#666] overflow-hidden whitespace-nowrap overflow-ellipsis">
         <div className="flex items-center">
           <a href="#" className="hover:text-[#3483fa] hover:underline shrink-0">Voltar</a>
           <span className="mx-2 shrink-0">|</span>
           <nav className="flex items-center gap-1 overflow-hidden overflow-ellipsis">
             <a href="#" className="hover:text-[#3483fa] hover:underline shrink-0">Brinquedos e Hobbies</a>
             <span className="shrink-0">›</span>
             <a href="#" className="hover:text-[#3483fa] hover:underline shrink-0">Álbuns e Figurinhas</a>
             <span className="shrink-0">›</span>
             <a href="#" className="hover:text-[#3483fa] hover:underline shrink-0">Álbuns</a>
           </nav>
         </div>
       </div>
 
       {/* Main card */}
       <main className="mx-auto max-w-[1200px] md:rounded-md bg-white px-4 md:px-6 py-4 md:py-6 shadow-sm">
         <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
           {/* Left: gallery + info */}
           <div className="grid grid-cols-1 gap-6 md:grid-cols-[64px_1fr] lg:grid-cols-[64px_1fr_1fr]">
             {/* Thumbs - Vertical on desktop, Horizontal on mobile */}
              <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar py-1 min-h-[64px]">
                {content.gallery.map((src: string, i: number) => (
                  <div key={i} className="relative">
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`h-12 w-12 md:h-12 md:w-12 shrink-0 overflow-hidden rounded border-2 bg-white p-0.5 transition-colors ${
                        i === active ? "border-[#3483fa]" : "border-[#e6e6e6] hover:border-[#ccc]"
                      }`}
                    >
                      <img src={src} alt={`Foto ${i + 1}`} className="h-full w-full object-contain" />
                    </button>
                    {isAdminMode && (
                      <button 
                        onClick={() => {
                          const newUrl = prompt("Nova URL da imagem:", src);
                          if (newUrl) updateArrayItem('gallery', i, newUrl);
                        }}
                        className="absolute -top-1 -right-1 bg-[#3483fa] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                      >
                        ✎
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Main image */}
              <div className="order-1 md:order-2 flex items-center justify-center bg-white rounded-lg overflow-hidden min-h-[300px] md:min-h-[400px]">
                <EditableImage
                  src={content.gallery[active]}
                  onUpdate={(val: string) => updateArrayItem('gallery', active, val)}
                  className="max-h-[350px] md:max-h-[500px] w-full"
                />
              </div>
 
             {/* Info - Stacks below gallery on mobile, beside on desktop */}
             <div className="order-3 md:col-span-2 lg:col-span-1 border-t md:border-t-0 pt-6 md:pt-0">
               <div className="text-[12px] text-[#666] flex items-center gap-1">
                 <span>Novo</span>
                 <span className="text-[#ccc]">|</span>
                 <a href="#" className="text-[#3483fa] hover:underline">+250 vendidos</a>
               </div>
               <div className="mt-2 flex items-center gap-2">
                 <div className="inline-block rounded-sm bg-[#00a650] px-1.5 py-0.5 text-[11px] font-semibold text-white uppercase">
                   Mais Vendido
                 </div>
                 <div className="text-[12px] text-[#3483fa] font-medium">1º em Álbuns de Figurinhas</div>
               </div>
 
                 <h1 className="mt-3 font-semibold leading-tight text-[#333] [font-size:clamp(1.25rem,4vw,1.5rem)] min-h-[1.5em]">
                   <EditableText value={content.title} onChange={(val: string) => updateField('title', val)} />
                 </h1>

              <div className="mt-1 flex items-center gap-1 text-[14px]">
                <EditableText 
                  value={content.rating} 
                  type="number" 
                  className="w-12"
                  onChange={(val: string) => updateField('rating', parseFloat(val))} 
                />
               <div className="flex text-[#3483fa]">
                  {[...Array(5)].map((_, i) => {
                    const isFull = i < Math.floor(content.rating);
                    return (
                   <svg
                     key={i}
                     xmlns="http://www.w3.org/2000/svg"
                     width="12"
                     height="12"
                     viewBox="0 0 24 24"
                      fill={isFull ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                   >
                     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                   </svg>
                  )})}
               </div>
                <span className="text-[#666]">
                  (<EditableText value={content.reviewsCount} onChange={(val: string) => updateField('reviewsCount', parseInt(val))} />)
                </span>
              </div>

                <div className="mt-6 border-b border-[#eee] pb-6 md:border-b-0 md:pb-0">
                   <div className="text-[14px] text-[#999] line-through">R$ <EditableText value={content.oldPrice} onChange={(val: string) => updateField('oldPrice', val)} /></div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-[36px] font-light leading-none text-[#333]">R$ <EditableText value={content.currentPrice} onChange={(val: string) => updateField('currentPrice', val)} /></span>
                     <span className="text-[18px] font-normal text-[#00a650]"><EditableText value={content.discount} onChange={(val: string) => updateField('discount', val)} /></span>
                  </div>
                  <div className="mt-2 text-[16px] text-[#00a650]">
                    em <b><EditableText value={content.installments} onChange={(val: string) => updateField('installments', val)} /></b> sem juros
                  </div>
                 <a href="#" className="mt-1 inline-block text-[14px] text-[#3483fa] hover:underline">
                   Ver os meios de pagamento
                 </a>
               </div>

              <div className="mt-5">
                <div className="text-[14px]">
                  <b>Cor:</b> <span className="text-[#666]"><EditableText value={content.color} onChange={(val: string) => updateField('color', val)} /></span>
                </div>
                <div className="mt-2 flex gap-2">
                  {content.gallery.slice(0, 3).map((src: string, i: number) => (
                    <button
                      key={i}
                      className={`h-12 w-12 overflow-hidden rounded border-2 bg-white p-0.5 ${
                        i === 0 ? "border-[#3483fa]" : "border-[#e6e6e6]"
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-[18px] font-semibold">O que você precisa saber sobre este produto</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-[1.5] text-[#333]">
                  {content.features.slice(0, 6).map((f: any, i: number) => (
                    <li key={i}>
                      <EditableText 
                        value={`${f.label}: ${f.value}`} 
                        onChange={(val: string) => {
                          const parts = val.split(':');
                          if (parts.length >= 2) {
                            updateNestedField('features', i, 'label', parts[0].trim());
                            updateNestedField('features', i, 'value', parts.slice(1).join(':').trim());
                          }
                        }} 
                      />
                    </li>
                  ))}
                </ul>
                <a href="#" className="mt-2 inline-block text-[14px] text-[#3483fa] hover:underline">
                  Ver características
                </a>
              </div>
            </div>
          </div>

           {/* Right: Buy box - Mobile: Simple list / Desktop: Boxed */}
           <aside className="lg:rounded-md lg:border lg:border-[#e6e6e6] lg:p-5 lg:shadow-sm space-y-4">
             <div className="hidden lg:block space-y-4">
                <div className="flex items-center gap-2 text-[12px] text-[#666]">
                  <span>Cor:</span>
                  <b className="text-[#333]">Amarelo (Capa Dura)</b>
                </div>

                <div className="mt-3 text-[14px] text-[#00a650] flex flex-col">
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00a650]"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    <b><EditableText value={content.delivery} onChange={(val: string) => updateField('delivery', val)} /></b>
                  </span>
                  <div className="text-[#3483fa] hover:underline cursor-pointer text-[12px] ml-6">Mais formas de entrega</div>
                </div>

                <div className="mt-3 text-[14px] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <a href="#" className="text-[#3483fa] hover:underline">Envio para todo o Brasil</a>
                </div>
             </div>

             {/* Mobile specific buy info - Simplified */}
             <div className="lg:hidden space-y-4 py-4 border-b border-[#eee]">
                <div className="flex items-center gap-3 text-[#00a650] text-[14px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  <div>
                    <span className="font-semibold">Frete grátis</span>
                    <p className="text-[#666] text-[12px]"><EditableText value={content.deliveryMobile} onChange={(val: string) => updateField('deliveryMobile', val)} /></p>
                  </div>
                </div>
                  <div className="flex items-center gap-3 text-[#333] text-[14px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666]"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <a href="#" className="text-[#3483fa] hover:underline">Envio para todo o Brasil</a>
                 </div>
             </div>

            <div className="mt-4 text-[14px] text-[#00a650]">
              <b><EditableText value={content.availability} onChange={(val: string) => updateField('availability', val)} /></b>
            </div>

            <div className="mt-2 text-[14px]">
              Armazenado e enviado pelo <b className="text-[#3483fa]">FULL</b>
            </div>

             <div className="pt-2">
               <div className="flex items-center gap-2 text-[14px] mb-4">
                 <span className="text-[#333] font-medium">Quantidade:</span>
                 <select
                   value={qty}
                   onChange={(e) => setQty(Number(e.target.value))}
                   className="rounded-md border border-[#e6e6e6] bg-white px-3 py-1.5 text-[14px] focus:outline-none focus:border-[#3483fa] transition-colors"
                 >
                   {[1, 2, 3, 4, 5].map((n) => (
                     <option key={n} value={n}>
                       {n} unidade{n > 1 ? "s" : ""}
                     </option>
                   ))}
                 </select>
                 <span className="text-[12px] text-[#999]">(+50 disponíveis)</span>
               </div>

               <div className="flex flex-col gap-3">
                 <button 
                   onClick={() => window.open((content as any).purchaseLink || "#", '_blank')}
                   className="w-full rounded-md bg-[#3483fa] py-3 text-[16px] font-semibold text-white hover:bg-[#2968c8] active:scale-[0.98] transition-all"
                 >
                   Comprar agora
                 </button>
                  <button
                    onClick={() => setCartOpen(true)}
                    className="w-full rounded-md bg-[#e3edfb] py-3 text-[16px] font-semibold text-[#3483fa] hover:bg-[#d1e3fa] active:scale-[0.98] transition-all"
                  >
                   Adicionar ao carrinho
                 </button>
               </div>
             </div>

            <div className="mt-5 text-[13px] leading-[1.6]">
              <div>
                Vendido por <a href="#" className="text-[#3483fa] hover:underline font-semibold"><EditableText value={content.seller} onChange={(val: string) => updateField('seller', val)} /></a>
              </div>
              <div className="text-[#00a650]"><EditableText value={content.sellerInfo} onChange={(val: string) => updateField('sellerInfo', val)} /></div>
            </div>

            <ul className="mt-4 space-y-2.5 border-t border-[#e6e6e6] pt-4 text-[13px]">
              <li className="flex gap-2">
                <span>
                  <a href="#" className="text-[#3483fa] hover:underline">Devolução grátis</a>. Você tem 30 dias.
                </span>
              </li>
              <li className="flex gap-2">
                <span>
                  <a href="#" className="text-[#3483fa] hover:underline">Compra Garantida</a>, receba o produto que está esperando ou devolvemos o dinheiro.
                </span>
              </li>
              <li className="flex gap-2">
                <span>
                  <a href="#" className="text-[#3483fa] hover:underline">3 meses de garantia</a> de fábrica.
                </span>
              </li>
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-[#e6e6e6] pt-4 text-[13px] text-[#3483fa]">
              <a href="#" className="hover:underline">Adicionar à lista</a>
              <a href="#" className="hover:underline">Compartilhar</a>
            </div>
          </aside>
        </div>

         {/* Características - Responsive Grid */}
         <section className="mt-12 border-t border-[#eee] pt-8">
           <h2 className="text-[20px] md:text-[24px] font-semibold text-[#333]">Características do produto</h2>
           <div className="mt-6 grid grid-cols-1 gap-y-0 md:grid-cols-2 md:gap-x-8">
              {content.features.map((f: any, i: number) => (
               <div
                 key={i}
                 className={`flex justify-between gap-4 border-b border-[#f0f0f0] py-4 px-2 text-[14px] ${
                   i % 2 === 0 ? "md:bg-[#fafafa]" : ""
                 }`}
               >
                  <span className="text-[#666] flex-1">
                    <EditableText value={f.label} onChange={(val: string) => updateNestedField('features', i, 'label', val)} />
                  </span>
                  <span className="text-right font-semibold text-[#333] flex-1">
                    <EditableText value={f.value} onChange={(val: string) => updateNestedField('features', i, 'value', val)} />
                  </span>
               </div>
             ))}
           </div>
         </section>

         {/* Descrição - Better readability */}
         <section className="mt-12 border-t border-[#eee] pt-8">
           <h2 className="text-[20px] md:text-[24px] font-semibold text-[#333]">Descrição</h2>
           <div className="mt-6 max-w-3xl space-y-5 text-[16px] leading-relaxed text-[#666]">
             {content.description.map((p: string, i: number) => (
               <p key={i}>
                 <EditableText 
                    value={p} 
                    multiline 
                    onChange={(val: string) => updateArrayItem('description', i, val)} 
                  />
               </p>
             ))}
          </div>
        </section>

         {/* Pagamento - Responsive layout */}
         <section className="mt-12 border-t border-[#eee] pt-8">
           <h2 className="text-[20px] md:text-[24px] font-semibold text-[#333]">Meios de pagamento</h2>
           <div className="mt-6 rounded-lg border border-[#eee] bg-[#fafafa] p-6 md:p-8">
             <div className="text-[18px] font-semibold text-[#00a650] mb-6">
               Pague em até 12x sem juros!
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               <div>
                 <div className="mb-3 text-[15px] font-semibold text-[#333]">Cartões de crédito</div>
                 <div className="flex flex-wrap gap-2">
                   {["Visa", "Master", "Elo", "Amex", "Hiper"].map((c) => (
                     <span key={c} className="rounded border border-[#ddd] bg-white px-2.5 py-1 text-[13px] text-[#666]">{c}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <div className="mb-3 text-[15px] font-semibold text-[#333]">Pix</div>
                 <span className="inline-flex items-center rounded border border-[#ddd] bg-white px-3 py-1 text-[13px] text-[#666]">Pix</span>
               </div>
               <div>
                 <div className="mb-3 text-[15px] font-semibold text-[#333]">Boleto</div>
                 <span className="inline-flex items-center rounded border border-[#ddd] bg-white px-3 py-1 text-[13px] text-[#666]">Boleto bancário</span>
               </div>
             </div>
           </div>
         </section>

         {/* Perguntas - Responsive Form */}
         <section className="mt-12 border-t border-[#eee] pt-8">
           <h2 className="text-[20px] md:text-[24px] font-semibold text-[#333]">Perguntas e respostas</h2>
           <div className="mt-6 text-[14px]">
             <div className="font-semibold text-[#333] mb-3">O que você quer saber?</div>
             <div className="flex flex-wrap gap-2 mb-6">
               {["Custo de envio", "Devoluções", "Prazo de entrega", "Meios de pagamento"].map((q) => (
                 <button
                   key={q}
                   className="rounded-md border border-[#eee] bg-[#f5f5f5] px-4 py-2 text-[13px] text-[#3483fa] font-medium hover:bg-[#e3edfb] transition-colors"
                 >
                   {q}
                 </button>
               ))}
             </div>
             <div className="mt-6 flex flex-col md:flex-row gap-3">
               <div className="flex-1 relative">
                 <input
                   type="text"
                   placeholder="Escreva sua pergunta…"
                   className="w-full rounded-md border border-[#ddd] px-4 py-3 text-[14px] outline-none focus:border-[#3483fa] transition-colors"
                 />
               </div>
               <button className="rounded-md bg-[#3483fa] px-8 py-3 text-[15px] font-semibold text-white hover:bg-[#2968c8] transition-all">
                 Perguntar
               </button>
             </div>
           </div>
         </section>

         {/* Avaliações - Responsive Layout */}
         <section className="mt-12 border-t border-[#eee] pt-8">
           <h2 className="text-[20px] md:text-[24px] font-semibold text-[#333]">Avaliações do produto</h2>
           <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr]">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="text-[64px] font-light leading-none text-[#333]">
                  <EditableText value={content.rating} type="number" onChange={(val: string) => updateField('rating', parseFloat(val))} />
                </div>
                <div className="flex text-[#3483fa] text-[24px] mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill={i < Math.floor(content.rating) ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onClick={() => isAdminMode && updateField('rating', i + 1)}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div className="text-[14px] text-[#999] mt-3 font-medium">
                  <EditableText value={content.reviewsCount} onChange={(val: string) => updateField('reviewsCount', parseInt(val))} /> avaliações
                </div>
               <div className="mt-8 w-full space-y-2 text-[12px]">
                 {[ [5, 78], [4, 15], [3, 4], [2, 2], [1, 1] ].map(([s, p]) => (
                   <div key={s} className="flex items-center gap-3">
                     <span className="w-4 text-right text-[#666]">{s}</span>
                     <div className="h-1.5 flex-1 rounded-full bg-[#f0f0f0] overflow-hidden">
                       <div className="h-full rounded-full bg-[#3483fa] transition-all duration-500" style={{ width: `${p}%` }} />
                     </div>
                     <span className="w-8 text-right text-[#999]">{p}%</span>
                   </div>
                 ))}
               </div>
             </div>
              <div className="space-y-8">
                {content.reviews.map((r: any, i: number) => (
                  <div key={i} className="border-b border-[#f5f5f5] pb-6 last:border-b-0">
                    <div className="flex text-[#3483fa] gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <svg 
                          key={idx} 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill={idx < r.stars ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => isAdminMode && updateNestedField('reviews', i, 'stars', idx + 1)}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <div className="mt-2 text-[12px] text-[#999] font-medium uppercase tracking-wider">
                      <EditableText value={r.name} onChange={(val: string) => updateNestedField('reviews', i, 'name', val)} /> · <EditableText value={r.date} onChange={(val: string) => updateNestedField('reviews', i, 'date', val)} />
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#555]">
                      <EditableText 
                        value={r.text} 
                        multiline 
                        onChange={(val: string) => updateNestedField('reviews', i, 'text', val)} 
                      />
                    </p>
                  </div>
                ))}
              </div>
           </div>
         </section>
      </main>

       {/* Footer - Fully Responsive Grid */}
       <footer className="mt-12 bg-white border-t border-[#eee]">
         <div className="mx-auto max-w-[1200px] px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 py-12 text-[13px] text-[#333]">
             <div className="col-span-1">
               <h4 className="mb-4 font-semibold text-[#333] uppercase tracking-wider text-[11px]">Sobre</h4>
               <ul className="space-y-2 text-[#666]">
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Mercado Livre</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Investor relations</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Sustentabilidade</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Tendências</a></li>
               </ul>
             </div>
             <div className="col-span-1">
               <h4 className="mb-4 font-semibold text-[#333] uppercase tracking-wider text-[11px]">Outros sites</h4>
               <ul className="space-y-2 text-[#666]">
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Mercado Pago</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Mercado Envios</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Mercado Ads</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Mercado Shops</a></li>
               </ul>
             </div>
             <div className="col-span-1">
               <h4 className="mb-4 font-semibold text-[#333] uppercase tracking-wider text-[11px]">Ajuda</h4>
               <ul className="space-y-2 text-[#666]">
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Comprar</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Vender</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Resolução de problemas</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Central de segurança</a></li>
               </ul>
             </div>
             <div className="col-span-1">
               <h4 className="mb-4 font-semibold text-[#333] uppercase tracking-wider text-[11px]">Redes sociais</h4>
               <ul className="space-y-2 text-[#666]">
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">X (Twitter)</a></li>
                  <li>
                    <button
                      onClick={handleAdminClick}
                      className="hover:text-[#3483fa] transition-colors text-left"
                    >
                      Facebook
                    </button>
                  </li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">Instagram</a></li>
                 <li><a href="#" className="hover:text-[#3483fa] transition-colors">YouTube</a></li>
               </ul>
             </div>
           </div>
           <div className="border-t border-[#f0f0f0] py-8 text-center text-[12px] text-[#999]">
             <p>© 1999-2026 — todos os direitos reservados.</p>
           </div>
         </div>
        </footer>

        {/* Admin mode UI */}
         {isAdminMode && (
           <div className="fixed top-0 left-0 right-0 z-[1000] bg-[#3483fa] text-white py-2 px-4 shadow-md flex flex-col md:flex-row justify-between items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
             <div className="flex items-center gap-2 font-semibold shrink-0">
               <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
               Modo Editor Ativo
             </div>
             <div className="flex-1 w-full md:px-8 flex items-center gap-2">
               <span className="text-[11px] md:text-[12px] opacity-80 whitespace-nowrap">Link de Compra:</span>
               <input 
                 type="text" 
                 value={(content as any).purchaseLink || ""} 
                 onChange={(e) => updateField('purchaseLink', e.target.value)} 
                 placeholder="https://..."
                 className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded px-2 py-1 md:py-0.5 text-[12px] outline-none focus:bg-white/20 placeholder:text-white/40" 
               />
             </div>
             <div className="flex items-center gap-4 shrink-0">
               <button 
                 onClick={() => setIsAdminMode(false)}
                 className="text-[13px] hover:underline whitespace-nowrap"
               >
                 Descartar
               </button>
               <button 
                 onClick={handleSave}
                 className="bg-white text-[#3483fa] px-4 py-1.5 md:py-1 rounded font-bold text-[13px] hover:bg-white/90 transition-colors whitespace-nowrap shadow-sm"
               >
                 Salvar
               </button>
             </div>
           </div>
         )}
     </div>
  );
}
