import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import styles from "./index.module.scss";
import { User } from "@/client/users";
import { useUserPosts } from "@/client/posts/useUserPosts";
import { useUserTrending } from "@/client/posts/useUserTrending";
import { useVirtual } from "@tanstack/react-virtual";
import * as S from "./ForumArea.styles";
import { PostCardAmstel } from "@/features/posts/PostCardAmstel/PostCardAmstel";
import Link from "next/link";
import { Avatar, Button } from "@/ui";
import { theme } from "@/../stitches.config";

import { ShareSquareIcon } from "@/ui/_icons";
import { getInitials, getProfileUrl } from "@/lib/string";

interface Posts {
  id: number;
  title: string;
  thumbnail: string;
  postDate: string;
}

interface PostProps {
  user: User;
}

const ForumArea: React.FC<PostProps> = ({ user }) => {
  const parentRef = useRef(null);

  const { posts = [] } = useUserPosts({
    nickname: process?.env?.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO,
  });

  const { posts: trending } = useUserTrending({
    nickname: process?.env?.NEXT_PUBLIC_NEGOCIOS_DE_ORGULHO,
  });

  const { virtualItems, measure, totalSize } = useVirtual({
    size: posts.length,
    parentRef,
    keyExtractor: (index) => posts[index].id,
  });

  if (virtualItems.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.containerColumn}>
        <span className={styles.divider}></span>
        <div className={styles.container}>
          <div className={styles.postWrapper}>
            <div className={styles.postAreaTitle}>
              <h5>OLÁ,</h5>
              <h3>SEJA BEM-VINDO AO FORÚM AMSTEL.</h3>
            </div>

            <S.Container
              ref={parentRef}
              css={{
                height: `${virtualItems.length * 785}px`,
                "@mobile": { height: totalSize },
              }}
            >
              <S.List
                css={{
                  transform: `translateY(${virtualItems[0].start}px)`,
                }}
              >
                {virtualItems?.map((virtualItem) => {
                  const post = posts.find(
                    (post) => post.id === virtualItem.key
                  );

                  if (!post) {
                    return null;
                  }

                  return (
                    <li key={post.id} ref={measure}>
                      <PostCardAmstel isAmstel post={post} />
                    </li>
                  );
                })}
              </S.List>
            </S.Container>
          </div>

          <div className={styles.topPostWrapper}>
            <div className={styles.topPost}>
              <div className={styles.topHeader}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10H14V12H3V10ZM3 6H14V8H3V6ZM3 14H10V16H3V14ZM16 13V21L22 17L16 13Z"
                    fill="white"
                  />
                </svg>

                <span className={styles.titleHeader}>TOP POSTS</span>
              </div>

              <div className={styles.topPostList}>
                {trending.map((trending) => (
                  <>
                    <a className={styles.topPostItem} key={trending.id}>
                      <div style={{ display: "flex", paddingBottom: 4 }}>
                        {trending?.author && (
                          <div className={styles.thumbnail}>
                            <Avatar.Square
                              alt={trending.author.fullName}
                              src={trending.author.profilePicture?.url}
                              fallback={getInitials(trending.author.fullName)}
                              profileUrl={getProfileUrl(
                                trending.author.nickname
                              )}
                              level={trending.author.score?.level}
                            />
                          </div>
                        )}
                        <div className={styles.titleHeader}>
                          <span>{trending.createdAt}</span>
                          <h3>{trending.title}</h3>
                        </div>
                      </div>
                      <div className={styles.share}>
                        <Link
                          href={`/negocios-de-orgulho/?postId=${trending.id}`}
                        >
                          <Button icon size="small" variant="transparent">
                            <ShareSquareIcon
                              color={theme.colors.textSecondary.value}
                            />
                          </Button>
                        </Link>
                      </div>
                    </a>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumArea;
