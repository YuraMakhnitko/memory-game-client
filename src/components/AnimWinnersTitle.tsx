export const AnimWinnersTitle: React.FC = (): JSX.Element => {
  const animTitle: string[] = ['🏆', 'W', 'I', 'N', 'N', 'E', 'R', 'S', '🏆'];

  return (
    <div className="anim-title__box">
      {animTitle.map((ch: string, index: number) => {
        return (
          <h2
            style={{
              animation: 'winners-letters 0.3s ease',
              animationDelay: `${index / 8}s`,
              animationFillMode: 'forwards',
            }}
            id="winners-text"
            className="winners-title"
            key={index}
          >
            <span>{ch}</span>
          </h2>
        );
      })}
    </div>
  );
};
