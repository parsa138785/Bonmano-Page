import React, { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const Bonmano = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const productSpecs = [
    { label: "گونه : 70% عربیکا و %30روبوستا" },
    { label: "میزان کافئین : بالا" },
    { label: "درجه اسیا : ریز" },
    { label: "موادتشکیل شونده : پودر اسپرسو اسیا شده" },
  ];

  const shippingInfo = [
    {
      label: "ارسال رایگان برای خرید های بالای\n700تومان",
      icon: "/broken---like---medal-ribbon-star.svg",
    },
    {
      label: "7روز ضمانت برگشت کالا",
      icon: "/broken---map---location---routing-2.svg",
    },
    {
      label: "پشتیبانی جدید",
      icon: "/broken---like---medal-ribbon-star.svg",
    },
  ];

  const productImages = ["/frame-44.png", "/frame-45.png", "/frame-43.png"];

  const breadcrumbItems = [
    { label: "خانه" },
    { label: "محصولات بن مانو" },
    { label: "قهوه اسپرسو" },
    { label: "پودر اسپرسو" },
    { label: "پودر قهوه اسپرسو آرتیمان", active: true },
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(translateX) > 100) {
      if (translateX > 0) {
        setCurrentImageIndex(prev => Math.max(0, prev - 1));
      } else {
        setCurrentImageIndex(prev => Math.min(productImages.length - 1, prev + 1));
      }
    }
    setTranslateX(0);
  };

  return (
    <div className="min-h-screen bg-[#d5d4d4] flex flex-col">
      <div className="flex-1 flex flex-row justify-center w-full">
        <div className="bg-[#d5d4d4] w-full max-w-[1423px] px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-auto sm:h-[784px] mt-6 bg-white rounded-[30px] overflow-hidden">
            <div className="absolute top-6 right-4 sm:top-16 sm:right-[104px] z-10 flex max-w-[calc(100%-2rem)] sm:max-w-none items-center justify-end gap-2 overflow-x-auto whitespace-nowrap pb-1">
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <a
                    href="#"
                    className={`relative w-fit mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] font-normal ${ 
                      item.active 
                        ? "text-[#405d28] cursor-default" 
                        : "text-black hover:text-[#567d36] transition-colors cursor-pointer"
                    } text-xs sm:text-base text-left tracking-[0] leading-[normal] [direction:rtl]`}
                    onClick={(e) => {
                      if (item.active) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {item.label}
                  </a>
                  {index < breadcrumbItems.length - 1 && (
                    <div className="relative w-3 h-3 bg-[#a7c48e] rounded-[10px] flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row w-full items-start justify-center gap-4 sm:gap-[36px] relative top-16 sm:top-[122px] px-4 sm:px-[104px] pb-8 sm:pb-0">
              <div className="w-full sm:w-auto flex flex-col items-center order-1 sm:order-3">
                {isZoomed && (
                  <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsZoomed(false)}
                  >
                    <div 
                      className="relative w-[90vw] h-[90vh] flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={productImages[currentImageIndex]}
                        alt="Zoomed product"
                        className="max-w-full max-h-full object-contain rounded-lg transform scale-150"
                        style={{
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <button
                        className="absolute top-4 right-4 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 transition-all"
                        onClick={() => setIsZoomed(false)}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                <div 
                  ref={sliderRef}
                  className="flex flex-col w-full sm:w-96 h-[390px] items-end gap-2 p-3 relative rounded-2xl border border-solid border-[#ae5d02] overflow-hidden cursor-pointer"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onClick={() => setIsZoomed(true)}
                  style={{
                    backgroundImage: `url(${productImages[currentImageIndex]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateX(${translateX}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  <div className="inline-flex flex-col items-start gap-3 p-3 relative">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center w-[41px] h-[41px] p-0 rounded-[50px] border border-solid border-[#fbf1e6] bg-white/80 hover:bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className="relative w-[21.5px]"
                        alt="Add to favorites"
                        src="/heart-1.svg"
                      />
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-center w-[41px] h-[41px] p-0 rounded-[50px] border border-solid border-[#fbf1e6] bg-white/80 hover:bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className="relative w-6 h-6"
                        alt="Share"
                        src="/broken---essentional--ui---share.svg"
                      />
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center justify-center w-[41px] h-[41px] p-0 rounded-[50px] border border-solid border-[#fbf1e6] bg-white/80 hover:bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className="relative w-6 h-6"
                        alt="Compare"
                        src="/broken---arrows---transfer-horizontal.svg"
                      />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-4 w-full mt-4">
                  <div className="flex items-center justify-center gap-4 w-full">
                    <Button
                      variant="outline"
                      className="flex w-[35px] h-[35px] items-center justify-center p-0 rounded-lg border border-solid border-[#c6c6c6]"
                      onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                    >
                      <img
                        className="w-6 h-6"
                        alt="Previous image"
                        src="/broken---arrows---alt-arrow-left.svg"
                      />
                    </Button>

                    <div className="flex gap-2 w-full max-w-[240px] overflow-x-auto pb-2">
                      {productImages.map((image, index) => (
                        <div
                          key={index}
                          className={`relative flex-shrink-0 w-24 h-24 rounded-lg cursor-pointer border-2 ${ 
                            index === currentImageIndex ? 'border-[#ae5d02]' : 'border-transparent'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {index === currentImageIndex && (
                            <div 
                              className="absolute inset-0 bg-[#C99D6C] bg-opacity-70 rounded-lg pointer-events-none"
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="flex w-[35px] h-[35px] items-center justify-center p-0 rounded-lg border border-solid border-[#c6c6c6]"
                      onClick={() => setCurrentImageIndex(prev => Math.min(productImages.length - 1, prev + 1))}
                    >
                      <img
                        className="w-6 h-6"
                        alt="Next image"
                        src="/broken---arrows---alt-arrow-right.svg"
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex flex-col items-center sm:items-start gap-4 order-2 sm:order-1">
                <div className="w-full sm:w-[220px] flex items-center justify-center sm:justify-end gap-1.5">
                  <div className="font-normal text-[#4a4a4a] text-[15px] text-center tracking-[0] [direction:rtl] relative w-fit [font-family:'Vazirmatn',Helvetica] leading-[normal]">                    تومان
                  </div>
                  <div className="mt-[-1.00px] font-bold text-black text-[24px] text-center tracking-[0] relative w-fit [font-family:'Vazirmatn',Helvetica] leading-[normal]">                    368,370
                  </div>
                </div>
                
                <Card className="w-full sm:w-[220px] border-none sm:border sm:border-[#e8e8e8]">
                  <CardContent className="flex flex-col items-start gap-4 p-0 sm:p-4">
                    <div className="flex items-center justify-between gap-2 p-3 relative self-stretch w-full rounded-lg border border-solid border-[#e8e8e8] bg-white">
                      <Button
                        variant="ghost"
                        className="flex items-center justify-center w-[31px] h-[31px] p-0 bg-[#b5b5b5] hover:bg-[#a5a5a5] rounded-[50px] transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <img
                          className="w-5 h-5"
                          alt="Decrease quantity"
                          src="/broken---arrows---double-alt-arrow-left.svg"
                        />
                      </Button>

                      <div className="flex-1 text-center">
                        <Input
                          className="h-8 [font-family:'Vazirmatn',Helvetica] font-bold text-[#3b3b3b] text-[21px] text-center border-none bg-transparent"
                          value={quantity}
                          readOnly
                        />
                      </div>

                      <Button
                        variant="ghost"
                        className="flex items-center justify-center w-[31px] h-[31px] p-0 bg-[#b5b5b5] hover:bg-[#a5a5a5] rounded-[50px] transition-colors"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <img
                          className="w-5 h-5"
                          alt="Increase quantity"
                          src="/broken---arrows---double-alt-arrow-right.svg"
                        />
                      </Button>
                    </div>

                    <Button className="flex items-center justify-center gap-2 p-3 relative self-stretch w-full bg-[#567d36] hover:bg-[#4a6b2e] rounded-lg transition-colors">
                      <div className="mt-[-0.50px] font-normal text-white text-[15px] text-center tracking-[0] [direction:rtl] relative w-fit [font-family:'Vazirmatn',Helvetica] leading-[normal]">                        افزودن به سبد خرید
                      </div>
                      <img
                        className="relative w-6 h-6"
                        alt="Add to cart"
                        src="/hicon---outline---buy-2.svg"
                      />
                    </Button>
                  </CardContent>
                </Card>

                <div className="flex flex-col w-full sm:w-[220px] items-start gap-2 relative">
                  {shippingInfo.map((info, index) => (
                    <Card
                      key={index}
                      className="flex items-start justify-center gap-2 p-4 w-full bg-[#e3e3e3] rounded-lg border-none"
                    >
                      <CardContent className="flex items-center justify-between p-0 w-full">
                        <div className="relative flex-1 mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">                          {info.label}
                        </div>
                        <img
                          className="relative w-6 h-6"
                          alt="Info icon"
                          src={info.icon}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="w-full sm:flex-1 flex flex-col items-start gap-3 order-3 sm:order-2">
                 <div className="w-full flex flex-col items-center sm:items-end px-0 py-1 relative self-stretch border-b [border-bottom-style:solid] border-[#e3e3e3]">
                  <div className="flex items-center sm:items-end justify-between pt-2.5 pb-[22px] px-0 relative self-stretch w-full flex-col-reverse sm:flex-row">
                    <div className="inline-flex items-start justify-center gap-3 relative mt-2 sm:mt-0">
                      <img
                        className="relative w-[18.5px] h-[18.5px] mt-[-0.75px] ml-[-0.75px]"
                        alt="Rating star"
                        src="/vector.svg"
                      />
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] font-normal text-[#2c2c2c] text-[13px] tracking-[0.65px] leading-[normal]">                        5/4.49
                      </div>
                    </div>
                    <div className="mt-[-1.00px] font-medium text-[#2c2c2c] text-[19px] text-center sm:text-left tracking-[0] [direction:rtl] relative w-fit [font-family:'Vazirmatn',Helvetica] leading-[normal]">                      پودر قهوه اسپرسو آرتیمان
                    </div>
                  </div>
                   <div className="relative self-stretch mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] font-light text-black text-xs text-center sm:text-right tracking-[0.60px] leading-[normal]">                      ARTIMAN ESPRESSO OOFFEE POWOER
                    </div>
                </div>

                <div className="flex items-center justify-between px-0 py-1 relative self-stretch w-full">
                  <div className="inline-flex items-center justify-center gap-1.5 relative">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] font-light text-black text-sm tracking-[0.70px] leading-[normal]">                      SKU:
                    </div>
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] font-normal text-[#3b3b3b] text-sm tracking-[0.70px] leading-[normal]">                      65215885124
                    </div>
                  </div>

                  <div className="inline-flex items-center justify-end gap-1.5 p-1 relative">
                    <div className="mt-[-0.50px] font-normal text-black text-sm text-left tracking-[0] [direction:rtl] relative w-fit [font-family:'Vazirmatn',Helvetica] leading-[normal]">                      پودر اسپرسو
                    </div>
                    <div className="mt-[-0.50px] font-normal text-black text-sm text-left tracking-[0.70px] [direction:rtl] relative w-fit [font-family:'Vazirmatn',Helvetica] leading-[normal]">                      دسته بندی :
                    </div>
                    <div className="relative w-[23px] h-[23px] bg-[url(/broken---settings--fine-tuning---widget-6.svg)] bg-[100%_100%]" />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                  {productSpecs.map((spec, index) => (
                    <Card
                      key={index}
                      className="flex items-start justify-center gap-2 p-4 w-full bg-[#e3e3e3] rounded-lg border-none"
                    >
                      <CardContent className="p-0">
                        <div className="relative flex-1 mt-[-1.00px] [font-family:'Vazirmatn',Helvetica] font-normal text-black text-[15px] tracking-[0] leading-[normal] [direction:rtl]">                          {spec.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full bg-[#567d36] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="[font-family:'Vazirmatn',Helvetica] text-sm">
            Created by Parsa
          </p>
        </div>
      </footer>
    </div>
  );
};
