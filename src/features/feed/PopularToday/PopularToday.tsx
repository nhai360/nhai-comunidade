import { Card, Typography } from "@/ui";

import * as S from "./PopularToday.styles";
import Image from "next/image";

export function PopularToday() {
  return (
    <Card>
      <Typography.Text size="body2" weight="bold" color="title">
        Populares hoje
      </Typography.Text>
      <S.PostList>
        <S.PostItem>
          <Image
            src="/vogue.png"
            alt="Vogue"
            width={112}
            height={99}
            style={{
              objectFit: "cover",
              borderRadius: "24px",
            }}
          />
          <Typography.Text size="caption">Nhaí na VOGUE</Typography.Text>
        </S.PostItem>
        <S.PostItem>
          <Image
            src="/forbes.png"
            alt="Forbes"
            width={112}
            height={99}
            style={{
              objectFit: "cover",
              borderRadius: "24px",
            }}
          />
          <Typography.Text size="caption">Nhaí na VOGUE</Typography.Text>
        </S.PostItem>
        <S.PostItem>
          <Image
            src="/jornal_nacional.png"
            alt="Jornal Nacional"
            width={112}
            height={99}
            style={{
              objectFit: "cover",
              borderRadius: "24px",
            }}
          />
          <Typography.Text size="caption">Nhaí na VOGUE</Typography.Text>
        </S.PostItem>
        <S.PostItem>
          <Image
            src="/jornal_nacional.png"
            alt="Jornal Nacional"
            width={112}
            height={99}
            style={{
              objectFit: "cover",
              borderRadius: "24px",
            }}
          />
          <Typography.Text size="caption">Nhaí na VOGUE</Typography.Text>
        </S.PostItem>
      </S.PostList>
    </Card>
  );
}
