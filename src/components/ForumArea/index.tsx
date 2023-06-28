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
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.66162 11.4079L16.1795 11.4079V13.6839L3.66162 13.6839V11.4079ZM3.66162 6.85598L16.1795 6.85598V9.13196L3.66162 9.13196L3.66162 6.85598ZM3.66162 15.9599L11.6275 15.9599V18.2359H3.66162L3.66162 15.9599ZM18.4555 14.8219L18.4555 23.9258L25.2834 19.3739L18.4555 14.8219Z"
                    fill="white"
                  />
                </svg>

                <span className={styles.titleHeader}>TOP POSTS</span>
              </div>

              <div className={styles.topPostList}>
                {trending.map((trending) => (
                  <>
                    <a className={styles.topPostItem} key={trending.id}>
                      {trending?.author && (
                        <div className={styles.thumbnail}>
                          <img
                            src={trending?.author.profilePicture?.url as any}
                            alt={trending.author.nickname}
                          />
                        </div>
                      )}
                      <div className={styles.titleHeader}>
                        <span>{trending.createdAt}</span>
                        <h3>{trending.title}</h3>
                      </div>
                      <div className={styles.share}>
                        <a href="#">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.4126 2.38074L16.2059 2.38074V6.17403"
                              stroke="#8C8C8C"
                              strokeWidth="1.13799"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10.8953 7.69135L16.2059 2.38074"
                              stroke="#8C8C8C"
                              strokeWidth="1.13799"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.6884 10.726V14.5193C14.6884 15.3576 14.0094 16.0366 13.171 16.0366H4.06712C3.2288 16.0366 2.5498 15.3576 2.5498 14.5193L2.5498 5.41537C2.5498 4.57706 3.2288 3.89806 4.06712 3.89806L7.86042 3.89806"
                              stroke="#8C8C8C"
                              strokeWidth="1.13799"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
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
