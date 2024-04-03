import { BrowserEvent, InterfaceElementName, SharedEventName } from '@uniswap/analytics-events'
import { TraceEvent } from 'analytics'
import { useDisableNFTRoutes } from 'hooks/useDisableNFTRoutes'
import styled from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { ExternalLink, StyledRouterLink } from 'theme/components'
import { useIsDarkMode } from 'theme/components/ThemeToggle'

import lightEcoImgSrc from './images/eco-logo.svg'
import darkEcoImgSrc from './images/eco-logo.svg'

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
  max-width: 1440px;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
`

const LogoSectionBottom = styled(LogoSection)`
  display: flex;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

const StyledLogo = styled.img`
  width: 72px;
  height: 72px;
  display: none;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media screen and (min-width: ${BREAKPOINTS.xl}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 24px;
  }
`

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 200px;
  margin: 20px 0 0 0;
  @media screen and (min-width: ${BREAKPOINTS.xl}px) {
    margin: 0;
  }
`

const LinkGroupTitle = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: 535;
`

const ExternalTextLink = styled(ExternalLink)`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.neutral2};
`

const TextLink = styled(StyledRouterLink)`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.neutral2};
`

const Copyright = styled.span`
  font-size: 16px;
  line-height: 20px;
  margin: 1rem 0 0 0;
  color: ${({ theme }) => theme.neutral3};
`

const LogoSectionContent = () => {
  const isDarkMode = useIsDarkMode()
  return (
    <>
      <StyledLogo src={isDarkMode ? darkEcoImgSrc : lightEcoImgSrc} alt="ETCswap Logo" />

      <Copyright>
        Made with ❤️ and 🤬
        <br />© {new Date().getFullYear()}
      </Copyright>
    </>
  )
}

export const AboutFooter = () => {
  const shouldDisableNFTRoutes = useDisableNFTRoutes()
  return (
    <Footer>
      <FooterLinks>
        <LinkGroup>
          <LinkGroupTitle>App</LinkGroupTitle>
          <TextLink to="/swap">Swap</TextLink>
          {/* <TextLink to="/tokens">Tokens</TextLink> */}
          {!shouldDisableNFTRoutes && <TextLink to="/nfts">NFTs</TextLink>}
          <TextLink to="/pools">Pools</TextLink>
        </LinkGroup>
        <LinkGroup>
          <LinkGroupTitle>Community</LinkGroupTitle>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.SUPPORT_LINK}
          >
            <ExternalTextLink href="https://www.gitbook.com/">Documentation</ExternalTextLink>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.SUPPORT_LINK}
          >
            <ExternalTextLink href="https://twitter.com/">Twitter</ExternalTextLink>
          </TraceEvent>
        </LinkGroup>
      </FooterLinks>

      <LogoSectionBottom>
        <LogoSectionContent />
      </LogoSectionBottom>
    </Footer>
  )
}
