export default function StarRating() {
  return (
    <div>
      <div>
        {Array.from({ length: 5 }, (_, i) => (
          <span>S{1 + i}</span>
        ))}
      </div>
      <p>10</p>
    </div>
  );
}
