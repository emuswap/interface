import { Trans } from '@lingui/macro'
import { BrowserEvent, InterfaceElementName, InterfacePageName, SharedEventName } from '@uniswap/analytics-events'
import { useWeb3React } from '@web3-react/core'
import { Trace, TraceEvent } from 'analytics'
import { AboutFooter } from 'components/About/AboutFooter'
import Card, { CardType } from 'components/About/Card'
import { MAIN_CARDS, MORE_CARDS } from 'components/About/constants'
import { BaseButton } from 'components/Button'
import { getChainInfo } from 'constants/chainInfo'
import { useDisableNFTRoutes } from 'hooks/useDisableNFTRoutes'
import Swap from 'pages/Swap'
import { useMemo, useRef } from 'react'
import { Link as NativeLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { useIsDarkMode } from 'theme/components/ThemeToggle'
import { Z_INDEX } from 'theme/zIndex'

const PageContainer = styled.div`
  position: absolute;
  top: 0;
  padding: ${({ theme }) => theme.navHeight}px 0px 0px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-behavior: smooth;
  overflow-x: hidden;
`

const Gradient = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  width: 100%;
  min-height: 550px;
  ${({ isDarkMode }) =>
    isDarkMode
      ? css`
          background: linear-gradient(rgba(8, 10, 24, 0) 0%, rgb(8 10 24 / 100%) 45%);
        `
      : css`
          background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255 255 255 /100%) 45%);
        `};
  z-index: ${Z_INDEX.under_dropdown};
  pointer-events: none;
  height: ${({ theme }) => `calc(100vh - ${theme.mobileBottomBarHeight}px)`};
  @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    height: 100vh;
  }
`

const GlowContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-y: hidden;
  height: ${({ theme }) => `calc(100vh - ${theme.mobileBottomBarHeight}px)`};
  @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    height: 100vh;
  }
`

const Glow = styled.div<{ color?: string }>`
  position: absolute;
  top: 68px;
  bottom: 0;
  background: radial-gradient(
    72.04% 72.04% at 50% 3.99%,
    ${({ theme, color }) => color || theme.accent1} 0%,
    rgba(51, 255, 153, 0.05) 100%
  );
  filter: blur(72px);
  border-radius: 24px;
  max-width: 480px;
  width: 100%;
  height: 100%;
`

const ContentContainer = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0 0 40px;
  max-width: min(720px, 90%);
  min-height: 535px;
  z-index: ${Z_INDEX.under_dropdown};
  transition: ${({ theme }) => `${theme.transition.duration.medium} ${theme.transition.timing.ease} opacity`};
  height: ${({ theme }) => `calc(100vh - ${theme.navHeight + theme.mobileBottomBarHeight}px)`};
  pointer-events: none;
  * {
    pointer-events: auto;
  }
`

const TitleText = styled.h1<{ isDarkMode: boolean; color?: string }>`
  color: transparent;
  font-size: 36px;
  line-height: 44px;
  font-weight: 535;
  text-align: center;
  margin: 0 0 24px;
  ${({ isDarkMode, color }) =>
    isDarkMode
      ? css`
          background: linear-gradient(
            20deg,
            ${color ? '#' + (parseInt(color.split('#')[1], 16) - 50).toString(16) : 'rgba(230, 255, 242, 1)'} 10%,
            ${color || 'rgba(51, 255, 153, 1)'} 100%
          );
        `
      : css`
          background: linear-gradient(
            10deg,
            ${color || 'rgba(51, 255, 153, 1)'} 0%,
            ${color ? '#' + (parseInt(color.split('#')[1], 16) - 50).toString(16) : 'rgba(230, 255, 242, 1)'} 100%
          );
        `};
  background-clip: text;
  -webkit-background-clip: text;

  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    font-size: 48px;
    line-height: 56px;
  }

  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    font-size: 64px;
    line-height: 72px;
  }
`

const SubText = styled.div`
  color: ${({ theme }) => theme.neutral2};
  font-size: 16px;
  line-height: 24px;
  font-weight: 535;
  text-align: center;
  max-width: 500px;
  margin: 0 0 32px;

  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    font-size: 20px;
    line-height: 28px;
  }
`

const SubTextContainer = styled.div`
  display: flex;
  justify-content: center;
`

const LandingButton = styled(BaseButton)`
  padding: 16px 0px;
  border-radius: 24px;
`

const ButtonCTA = styled(LandingButton)<{ color?: string }>`
  background: linear-gradient(
    93.06deg,
    ${({ color }) => color || '#00cc66'} 2.66%,
    ${({ color }) => (color ? '#' + (parseInt(color.split('#')[1], 16) - 50).toString(16) : '#33ff99')} 98.99%
  );
  border: none;
  color: ${({ theme }) => theme.neutral3};
  transition: ${({ theme }) => `all ${theme.transition.duration.medium} ${theme.transition.timing.ease}`};

  &:hover {
    box-shadow: 0px 0px 16px 0px #13131333;
  }
`

const ButtonCTAText = styled.p`
  margin: 0px;
  font-size: 16px;
  font-weight: 535;
  white-space: nowrap;

  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    font-size: 20px;
  }
`

const ActionsContainer = styled.span`
  max-width: 300px;
  width: 100%;
  pointer-events: auto;
`

const LearnMoreContainer = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.neutral3};
  cursor: pointer;
  font-size: 20px;
  font-weight: 535;
  margin: 18px 0 36px;
  display: flex;
  visibility: hidden;
  pointer-events: auto;
  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    visibility: visible;
  }

  transition: ${({ theme }) => `${theme.transition.duration.medium} ${theme.transition.timing.ease} opacity`};

  &:hover {
    opacity: 0.6;
  }
`

const AboutContentContainer = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 5rem;
  width: 100%;
  ${({ isDarkMode }) =>
    isDarkMode
      ? css`
          background: linear-gradient(179.82deg, rgba(0, 0, 0, 0) 0.16%, #050026 99.85%);
        `
      : css`
          background: linear-gradient(179.82deg, rgba(255, 255, 255, 0) 0.16%, #eaeaea 99.85%);
        `};
  @media screen and (min-width: ${BREAKPOINTS.md}px) {
    padding: 0 96px 5rem;
  }
`

const CardGrid = styled.div<{ cols: number }>`
  display: grid;
  gap: 12px;
  width: 100%;
  padding: 24px 0 0;
  max-width: 1440px;
  scroll-margin: ${({ theme }) => `${theme.navHeight}px 0 0`};

  grid-template-columns: 1fr;
  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    // At this screen size, we show up to 2 columns.
    grid-template-columns: ${({ cols }) =>
      Array.from(Array(cols === 2 ? 2 : 1))
        .map(() => '1fr')
        .join(' ')};
    gap: 32px;
  }

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    // at this screen size, always show the max number of columns
    grid-template-columns: ${({ cols }) =>
      Array.from(Array(cols))
        .map(() => '1fr')
        .join(' ')};
    gap: 32px;
  }
`

const LandingSwapContainer = styled.div`
  height: ${({ theme }) => `calc(100vh - ${theme.mobileBottomBarHeight}px)`};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

const SwapCss = css`
  * {
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-10px);
    transition: ${({ theme }) => `transform ${theme.transition.duration.medium} ${theme.transition.timing.ease}`};
  }
`

const LinkCss = css`
  text-decoration: none;
  max-width: 480px;
  width: 100%;
`

const LandingSwap = styled(Swap)`
  ${SwapCss}
`

const Link = styled(NativeLink)`
  ${LinkCss}
`

export default function Landing() {
  const { chainId } = useWeb3React()
  const chainInfo = getChainInfo(chainId)
  const isDarkMode = useIsDarkMode()
  const cardsRef = useRef<HTMLDivElement>(null)

  const shouldDisableNFTRoutes = useDisableNFTRoutes()
  const cards = useMemo(
    () => MAIN_CARDS.filter((card) => !(shouldDisableNFTRoutes && card.to.startsWith('/nft'))),
    [shouldDisableNFTRoutes]
  )

  return (
    <Trace page={InterfacePageName.LANDING_PAGE} shouldLogImpression>
      <PageContainer data-testid="landing-page">
        <LandingSwapContainer>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.LANDING_PAGE_SWAP_ELEMENT}
          >
            <Link to="/swap">
              <LandingSwap />
            </Link>
          </TraceEvent>
        </LandingSwapContainer>
        <Gradient isDarkMode={isDarkMode} />
        <GlowContainer>
          <Glow color={chainInfo?.color} />
        </GlowContainer>
        <ContentContainer isDarkMode={isDarkMode}>
          <TitleText isDarkMode={isDarkMode} color={chainInfo?.color}>
            {shouldDisableNFTRoutes ? (
              <Trans>Trade Tokens on the Latest Layers</Trans>
            ) : (
              <Trans>Trade Crypto and NFTs on Ethereum Classic</Trans>
            )}
          </TitleText>
          <SubTextContainer>
            <SubText>
              {shouldDisableNFTRoutes ? (
                <Trans>
                  Concentraded liquidity for the
                  <br />
                  latest blockchains.
                </Trans>
              ) : (
                <Trans>
                  Buy, sell, and explore digital assets & collectables on
                  <br />
                  the most secure smart contract blockchain in the world
                </Trans>
              )}
            </SubText>
          </SubTextContainer>
          <ActionsContainer>
            <TraceEvent
              events={[BrowserEvent.onClick]}
              name={SharedEventName.ELEMENT_CLICKED}
              element={InterfaceElementName.CONTINUE_BUTTON}
            >
              <ButtonCTA as={Link} to="/swap" color={chainInfo?.color}>
                <ButtonCTAText>
                  <Trans>Get started</Trans>
                </ButtonCTAText>
              </ButtonCTA>
            </TraceEvent>
          </ActionsContainer>
          <LearnMoreContainer
            onClick={() => {
              cardsRef?.current?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Trans>Learn more</Trans>
          </LearnMoreContainer>
        </ContentContainer>
        <AboutContentContainer isDarkMode={isDarkMode}>
          <CardGrid cols={cards.length} ref={cardsRef}>
            {cards.map(({ darkBackgroundImgSrc, lightBackgroundImgSrc, ...card }) => (
              <Card
                {...card}
                backgroundImgSrc={isDarkMode ? darkBackgroundImgSrc : lightBackgroundImgSrc}
                key={card.title}
              />
            ))}
          </CardGrid>
          <CardGrid cols={MORE_CARDS.length}>
            {MORE_CARDS.map(({ darkIcon, lightIcon, ...card }) => (
              <Card {...card} icon={isDarkMode ? darkIcon : lightIcon} key={card.title} type={CardType.Secondary} />
            ))}
          </CardGrid>
          <br />
          <br />
          <AboutFooter />
        </AboutContentContainer>
      </PageContainer>
    </Trace>
  )
}
