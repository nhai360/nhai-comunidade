import Script from "next/script"
import CookiesJS from 'js-cookie'

export const GoogleAnalytics = () => {
  const validation = CookiesJS.get('accepted_cookies')

  if (!validation) return <></>

  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-51264N467S');
        `}
      </Script>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-51264N467S`} />
    </>
  )
}