import { Trans } from '@lingui/macro'
import { AutoColumn } from 'components/Column'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'
import { ExternalLink } from 'theme/components'

const CTASection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  opacity: 0.8;

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

const CTA = styled(ExternalLink)`
  padding: 16px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.surface3};

  * {
    color: ${({ theme }) => theme.neutral1};
    text-decoration: none !important;
  }

  :hover {
    border: 1px solid ${({ theme }) => theme.surface3};

    text-decoration: none;
    * {
      text-decoration: none !important;
    }
  }
`

const HeaderText = styled(ThemedText.DeprecatedLabel)`
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: 535 !important;
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    font-size: 16px;
  `};
`

const ResponsiveColumn = styled(AutoColumn)`
  grid-template-columns: 1fr;
  width: 100%;
  gap: 8px;

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    gap: 8px;
  `};
  justify-content: space-between;
`

export default function CTACards() {
  return (
    <CTASection>
      <CTA href="https://gitbook.com">
        <ResponsiveColumn>
          <HeaderText>
            <Trans>Learn about providing liquidity</Trans> ↗
          </HeaderText>
          <ThemedText.DeprecatedBody style={{ alignItems: 'center', display: 'flex', fontWeight: 485 }}>
            <Trans>Check out our v3 LP walkthrough.</Trans>
          </ThemedText.DeprecatedBody>
        </ResponsiveColumn>
      </CTA>
    </CTASection>
  )
}
