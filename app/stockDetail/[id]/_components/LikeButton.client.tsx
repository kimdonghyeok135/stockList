"use client";

import { useLikelist } from "@/app/store/likelist";
import { toast } from "@/lib/toast";
import { Heart } from "lucide-react";

type Props = {
  symbol : string
}

export default function LikeButton({symbol} : Props){
  const {has, toggle} =useLikelist()
  const liked = has(symbol)
  const setToggle = (symbol : string) => {
    toggle(symbol)
    if(!liked) toast.success("관심목록 등록")
  }
  return (<>
    <button
          className="h-12 w-12 rounded-2xl bg-white/10 ring-1 ring-white/10
                     flex items-center justify-center
                     shadow-[0_0_30px_rgba(255,0,120,0.25)]
                     active:scale-95 transition"
          aria-label="like"
        >
          <Heart onClick={() => {setToggle(symbol)}}
            className={
              liked
                ? "h-6 w-6 text-rose-400 fill-rose-400"
                : "h-6 w-6 text-white/70"
            }
          />
        </button>
  </>);
}
