import { CircleNotch } from "phosphor-react";

export function Loading() {
  return (
    <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
      {/* animate spin => animação para o ícone ficar girando */}
      <CircleNotch weight="bold" className="2-4 h-4 animate-spin" />
    </div>
  );
}
