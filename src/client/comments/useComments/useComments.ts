import { CommentWithColor } from "@/client/comments";

export function useComments(): CommentWithColor[] {
  return [
    {
      id: "1",
      content:
        "Adorei ver essa iniciativa de apoio aos empreendedores LGBT. Vamos mostrar que somos capazes de alcançar o sucesso também!",
      createdAt: new Date(),
      likesCount: 30,
      author: {
        id: "2",
        name: "John Doe",
        level: "30",
        avatarUrl:
          "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
      },
      color: "pink",
    },
    {
      id: "2",
      content:
        "Adorei ver essa iniciativa de apoio aos empreendedores LGBT. Vamos mostrar que somos capazes de alcançar o sucesso também!",
      createdAt: new Date(),
      likesCount: 173,
      author: {
        id: "1",
        name: "Colm Tuite",
        level: "56",
        avatarUrl:
          "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
      },
      color: "green",
      replies: [
        {
          id: "2",
          content: "Segundo comentário",
          createdAt: new Date(),
          likesCount: 10,
          author: {
            id: "2",
            name: "John Doe",
            level: "30",
            avatarUrl:
              "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
          },
          replies: [
            {
              id: "3",
              content: "Terceiro comentário",
              createdAt: new Date(),
              likesCount: 10,
              author: {
                id: "2",
                name: "John Doe",
                level: "30",
                avatarUrl:
                  "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
              },
            },
            {
              id: "4",
              content: "Quarto comentário",
              createdAt: new Date(),
              likesCount: 10,
              author: {
                id: "2",
                name: "John Doe",
                level: "30",
                avatarUrl:
                  "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
              },
            },
            {
              id: "5",
              content: "Quinto comentário",
              createdAt: new Date(),
              likesCount: 10,
              author: {
                id: "2",
                name: "John Doe",
                level: "30",
                avatarUrl:
                  "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
              },
            },
            {
              id: "6",
              content: "Sexto comentário",
              createdAt: new Date(),
              likesCount: 10,
              author: {
                id: "2",
                name: "John Doe",
                level: "30",
                avatarUrl:
                  "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
              },
            },
          ],
        },
      ],
    },
    {
      id: "3",
      content: "Título da enquete",
      createdAt: new Date(),
      likesCount: 500,
      author: {
        id: "2",
        name: "John Doe",
        level: "30",
        avatarUrl:
          "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80",
      },
      color: "yellow",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ];
}
