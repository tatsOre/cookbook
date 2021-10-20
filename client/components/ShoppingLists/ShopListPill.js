const ShopListPill = ({ data }) => {
  const { _id, recipe, items } = data;
  return (
    <div>
      <h3>
        Shopping List for <a href={`/recipes/${_id}`}>{recipe.title}</a>
      </h3>
      <ul>
        {items.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShopListPill;
