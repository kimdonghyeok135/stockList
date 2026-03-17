import Image from "next/image";
import LikeButton from "./LikeButton.client";
import { StockProfile } from "@/types/stock";

export default function StockHeader({
  stockDetailInfo,
  id,
}: {
  stockDetailInfo: StockProfile;
  id: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Image src={stockDetailInfo?.logo || "/no-logo.png"} alt="" width={48} height={48} />
        <div className="leading-tight">
          <p className="text-xs text-gray-300">Stock Detail</p>
          <h2 className="text-2xl font-extrabold tracking-wide">{stockDetailInfo.name}</h2>
        </div>
      </div>
      <LikeButton symbol={id} />
    </div>
  );
}
