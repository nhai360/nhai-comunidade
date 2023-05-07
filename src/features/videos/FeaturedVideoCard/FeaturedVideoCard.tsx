import { Button, Card, Typography } from "@/ui";

export function FeaturedVideoCard() {
  return (
    <Card>
      <Typography.Title>
        Venha experimentar a força de uma comunidade unida!
      </Typography.Title>
      <Typography.Text>
        Experimente o poder da colaboração entre indivíduos de diferentes
        histórias e ideias inovadoras enquanto faz parte de nossa comunidade.
      </Typography.Text>
      <Button>Assistir</Button>
      <Button>Mais informações</Button>

      <img src="/featured-video-thumbnail.png" />
    </Card>
  );
}
