import Link from "next/link";

import { FiHome, FiSettings } from "react-icons/fi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";

import * as S from "./Sidebar.styles";

export function Sidebar() {
  return (
    <S.Container>
      <nav>
        <S.NavigationList>
          <Link href="/">
            <S.NavItem active>
              <FiHome size={20} />
            </S.NavItem>
          </Link>
          <Link href="/">
            <S.NavItem>
              <AiOutlineVideoCamera size={24} />
            </S.NavItem>
          </Link>
          <Link href="/">
            <S.NavItem>
              <CiViewList size={24} strokeWidth={0.5} />
            </S.NavItem>
          </Link>
        </S.NavigationList>
      </nav>

      <S.NavItem>
        <FiSettings size={24} />
      </S.NavItem>
    </S.Container>
  );
}
