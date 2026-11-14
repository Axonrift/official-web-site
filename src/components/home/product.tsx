import { Icon } from "@/components/icon";
import { ProductPreview } from "@/components/home/product-preview";
import { product } from "@/content/home";

export function Product() {
  return (
    <section className="section wrap" id="product" aria-labelledby="product-title">
      <div className="product-panel" data-reveal>
        <div className="product-copy">
          <p className="eyebrow"><span className="section-number">02 /</span>Our SaaS</p>
          <h2 id="product-title">{product.title}</h2>
          <p>{product.description}</p>
          <a href="#contact" data-inquiry-topic={product.id} className="button button-outline">
            Ask about our product <Icon name="up-right" />
          </a>
        </div>
        <div className="product-stage">
          <div className="product-stage-label"><span className="dot" />Inside the workspace<span>AX / PRODUCT</span></div>
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
