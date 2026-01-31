"use client";

type GameViewProps = React.PropsWithChildren<{
  // other props here if needed
}>;

export default function GameView({ children }: GameViewProps) {
  return (
    <div className="w-full h-full max-w-[800px] max-h-[800px] p-4 flex flex-col bg-black">
      <div className="flex-1 flex items-center justify-center">
        <div className="aspect-square w-full max-w-[800px]">{children}</div>
      </div>
    </div>
  );
}
