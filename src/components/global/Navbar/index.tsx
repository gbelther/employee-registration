import Link from "next/link";
import * as Sty from "./styles";

export function Navbar() {
  return (
    <Sty.Container>
      <Sty.NavigationWrapper>
        <Link href="/" passHref>
          <Sty.Anchor>
            <Sty.ItemWrapper>
              <Sty.NavItemTitle>Funcionários</Sty.NavItemTitle>
            </Sty.ItemWrapper>
          </Sty.Anchor>
        </Link>
      </Sty.NavigationWrapper>
    </Sty.Container>
  );
}
