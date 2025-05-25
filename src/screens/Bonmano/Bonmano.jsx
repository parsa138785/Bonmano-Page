import React, { useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import styles from "./Bonmano.module.css";

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
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.wrapper}>
          <div className={styles.productCard}>
            <div className={styles.breadcrumbs}>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <a
                    href="#"
                    className={`${styles.breadcrumbLink} ${item.active ? styles.active : ''}`}
                    onClick={(e) => {
                      if (item.active) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {item.label}
                  </a>
                  {index < breadcrumbItems.length - 1 && (
                    <div className={styles.breadcrumbDot} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className={styles.productContent}>
              <div className={styles.imageSection}>
                {isZoomed && (
                  <div 
                    className={styles.zoomedView}
                    onClick={() => setIsZoomed(false)}
                  >
                    <div 
                      className={styles.zoomedContent}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={productImages[currentImageIndex]}
                        alt="Zoomed product"
                        className={styles.zoomedImage}
                      />
                      <button
                        className={styles.closeButton}
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
                  className={styles.imageSlider}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onClick={() => setIsZoomed(true)}
                  style={{
                    backgroundImage: `url(${productImages[currentImageIndex]})`,
                    transform: `translateX(${translateX}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                  }}
                >
                  <div className={styles.imageControls}>
                    <Button
                      variant="outline"
                      className={styles.controlButton}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className={styles.controlIcon}
                        alt="Add to favorites"
                        src="/heart-1.svg"
                      />
                    </Button>

                    <Button
                      variant="outline"
                      className={styles.controlButton}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className={styles.controlIcon}
                        alt="Share"
                        src="/broken---essentional--ui---share.svg"
                      />
                    </Button>

                    <Button
                      variant="outline"
                      className={styles.controlButton}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className={styles.controlIcon}
                        alt="Compare"
                        src="/broken---arrows---transfer-horizontal.svg"
                      />
                    </Button>
                  </div>
                </div>

                <div className={styles.thumbnailControls}>
                  <Button
                    variant="outline"
                    className={styles.navButton}
                    onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                  >
                    <img
                      className={styles.navIcon}
                      alt="Previous image"
                      src="/broken---arrows---alt-arrow-left.svg"
                    />
                  </Button>

                  <div className={styles.thumbnailContainer}>
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        style={{
                          backgroundImage: `url(${image})`
                        }}
                      >
                        {index === currentImageIndex && (
                          <div className={styles.thumbnailOverlay}></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className={styles.navButton}
                    onClick={() => setCurrentImageIndex(prev => Math.min(productImages.length - 1, prev + 1))}
                  >
                    <img
                      className={styles.navIcon}
                      alt="Next image"
                      src="/broken---arrows---alt-arrow-right.svg"
                    />
                  </Button>
                </div>
              </div>

              <div className={styles.productInfo}>
                <div className={styles.price}>
                  <div className={styles.currency}>تومان</div>
                  <div className={styles.amount}>368,370</div>
                </div>

                <Card className={styles.quantityCard}>
                  <CardContent className={styles.quantityContent}>
                    <div className={styles.quantityControls}>
                      <Button
                        variant="ghost"
                        className={styles.quantityButton}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <img
                          className={styles.quantityIcon}
                          alt="Decrease quantity"
                          src="/broken---arrows---double-alt-arrow-left.svg"
                        />
                      </Button>

                      <Input
                        className={styles.quantityInput}
                        value={quantity}
                        readOnly
                      />

                      <Button
                        variant="ghost"
                        className={styles.quantityButton}
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <img
                          className={styles.quantityIcon}
                          alt="Increase quantity"
                          src="/broken---arrows---double-alt-arrow-right.svg"
                        />
                      </Button>
                    </div>

                    <Button className={styles.addToCartButton}>
                      <div className={styles.buttonText}>افزودن به سبد خرید</div>
                      <img
                        className={styles.cartIcon}
                        alt="Add to cart"
                        src="/hicon---outline---buy-2.svg"
                      />
                    </Button>
                  </CardContent>
                </Card>

                <div className={styles.shippingInfo}>
                  {shippingInfo.map((info, index) => (
                    <Card
                      key={index}
                      className={styles.infoCard}
                    >
                      <CardContent className={styles.infoContent}>
                        <div className={styles.infoText}>{info.label}</div>
                        <img
                          className={styles.infoIcon}
                          alt="Info icon"
                          src={info.icon}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className={styles.productDetails}>
                <div className={styles.productHeader}>
                  <div className={styles.productTitle}>
                    <div className={styles.rating}>
                      <img
                        className={styles.starIcon}
                        alt="Rating star"
                        src="/vector.svg"
                      />
                      <div className={styles.ratingText}>5/4.49</div>
                    </div>
                    <div className={styles.productName}>پودر قهوه اسپرسو آرتیمان</div>
                  </div>
                  <div className={styles.productSubtitle}>ARTIMAN ESPRESSO COFFEE POWDER</div>
                </div>

                <div className={styles.productMeta}>
                  <div className={styles.sku}>
                    <div className={styles.skuLabel}>SKU:</div>
                    <div className={styles.skuValue}>65215885124</div>
                  </div>

                  <div className={styles.category}>
                    <div className={styles.categoryText}>پودر اسپرسو</div>
                    <div className={styles.categoryLabel}>دسته بندی :</div>
                    <div className={styles.categoryIcon} />
                  </div>
                </div>

                <div className={styles.specifications}>
                  {productSpecs.map((spec, index) => (
                    <Card
                      key={index}
                      className={styles.specCard}
                    >
                      <CardContent className={styles.specContent}>
                        <div className={styles.specText}>{spec.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            Created by Parsa
          </p>
        </div>
      </footer>
    </div>
  );
};