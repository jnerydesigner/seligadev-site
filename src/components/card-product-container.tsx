import { CardProduct, CardProps } from "./card-product";

interface CardProductContainerProps {
  cardProducts: CardProps[];
}

export const CardProductContainer = ({ cardProducts }: CardProductContainerProps) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cardProducts?.map((card) => (
          <CardProduct
            imageUrl={card.imageUrl}
            name={card.name}
            price={card.price}
            productUrl={card.productUrl}
            key={card.id}
          />
        ))}
      </div>
    </section>
  );
};
