import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import ExchangeModal from '../../Bond/components/ExchangeModal';
import useBondStats from '../../../hooks/useBondStats';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBombFinance from '../../../hooks/useBombFinance';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import useModal from '../../../hooks/useModal';
import { ArrowUpwardSharp, ArrowDownwardSharp, ShoppingCart } from '@material-ui/icons';
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import Bbond from '../../../assets/img/bbond-512.png';
import { useTransactionAdder } from '../../../state/transactions/hooks';
import { getDisplayBalance } from '../../../utils/formatBalance';
import TokenSymbol from '../../../components/TokenSymbol';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';

const Bonds: React.FC<any> = () => {
  const bondStat = useBondStats();
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const cashPrice = useCashPriceInLastTWAP();
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const bondsPurchasable = useBondsPurchasable();
  const addTransaction = useTransactionAdder();
  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bombFinance, addTransaction],
  );

  const balanceBomb = useTokenBalance(bombFinance.BOMB);
  const [onPresentP, onDismissP] = useModal(
    <ExchangeModal
      title={'Purchase'}
      description={
        !isBondPurchasable
          ? 'BOMB is over peg'
          : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
      }
      max={balanceBomb}
      onConfirm={(value) => {
        handleBuyBonds(value);
        onDismissP();
      }}
      action={'Purchase'}
      tokenName={'BOMB'}
    />,
  );

  const balanceBbond = useTokenBalance(bombFinance.BBOND);
  const [onPresentR, onDismissR] = useModal(
    <ExchangeModal
      title={'Redeem'}
      description={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
      max={balanceBbond}
      onConfirm={(value) => {
        handleRedeemBonds(value);
        onDismissR();
      }}
      action={'Redeem'}
      tokenName={'BBOND'}
    />,
  );
  return (
    <>
      {/* Bonds */}
      <Styleddiv>
        <Grid xs={12}>
          <Paper style={{ background: 'rgba(32, 37, 67, 0.5)', borderRadius: '5px' }}>
            <Box p={4} style={{ textAlign: 'left' }}>
              <img alt="b bond" style={{ width: '60px', float: 'left', marginRight: '10px' }} src={Bbond} />
              <h3 style={{ color: 'white' }}>Bonds</h3>
              <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
            </Box>
            <Grid container spacing={3} style={{ textAlign: 'center' }}>
              <Grid item xs={3} style={{ padding: '0' }}>
                Current Price :(Bomb)^2
                <h3 style={{ color: 'white', marginTop: '10px' }}>
                  BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'} BTCB
                </h3>
              </Grid>
              <Grid item xs={3} style={{ padding: '0', textAlign: 'center' }}>
                Available to redeem:
                <h3 style={{ color: 'white', fontSize: '2rem' }}>
                  <img alt="b bond" style={{ width: '40px' }} src={Bbond} />
                  {getDisplayBalance(bondsPurchasable)}
                </h3>
              </Grid>

           {/* Purchase and Redeem Section */}
              <Grid item xs={6} style={{ paddingRight: '20px' }}>
                <Box style={{ padding: '10px', textAlign: 'left' }}>
                  <p style={{ color: 'white' }}>
                    Purchase BBond
                    <span style={{ float: 'right' }}>
                      <Button
                        onClick={() => {
                          onPresentP();
                        }}
                        disabled={!bondStat || isBondRedeemable}
                        style={{ border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
                      >
                        Purchase <ShoppingCart />
                      </Button>
                    </span>
                  </p>
                  <p style={{ fontSize: '0.9rem' }}>Bomb is over peg</p>
                  <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)' }} />

                  <p style={{ color: 'white' }}>
                    Redeem Bond
                    <span style={{ float: 'right' }}>
                      <StyledButton
                        onClick={() => {
                          onPresentR();
                        }}
                        disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                        style={{ border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}
                        >
                          <div>Redeem</div>
                          <div>
                            <ArrowDownwardSharp />
                          </div>
                        </div>
                      </StyledButton>
                    </span>
                  </p>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Styleddiv>
    </>
  );
};

//Styled CSS
const Styleddiv = styled.div`
  margin: 10px;
  background: #23284bbf;
  border: 1px solid #728cdf;
  border-radius: 10px;
  padding: 10px;
  h1 {
    text-transform: none;
    color: white;
    font-size: 1.25rem;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid currentColor;
  color: ${(p) => (p.disabled ? '#FFFFFF80' : '#FFFFFF')};
  border-radius: 16px;
  margin: 3px;
  padding: 5px;
  margin: 0 auto;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${(p) => (p.disabled ? 'transparent' : '#FFFFFF')};
    color: ${(p) => (p.disabled ? '#FFFFFF80' : 'black')};
  }
`;
export default Bonds;
