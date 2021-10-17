const ShopListCard = ({ data }) => {
  const { _id, recipe, items } = data;
  console.log(data);
  return (
    <div>
      <h3>Shopping List for {recipe.title}</h3>
      <ul>
        {items.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShopListCard;
