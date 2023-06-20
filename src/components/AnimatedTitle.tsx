export const AnimatedTitle: React.FC = (): JSX.Element => {
  const animTitle: string[] = [
    'P',
    'L',
    'A',
    'N',
    'E',
    'T',
    'S',
    '  ',
    'M',
    'A',
    'T',
    'C',
    'H',
  ];

  return (
    <div className="anim-title__box">
      {animTitle.map((ch: string, index: number) => {
        return (
          <h2
            style={{
              animation: 'title-letters 0.5s ease',
              animationDelay: `${index / 8}s`,
              animationFillMode: 'forwards',
            }}
            className="anim-title__letter"
            key={index}
          >
            <span>{ch}</span>
          </h2>
        );
      })}
    </div>
  );
};
