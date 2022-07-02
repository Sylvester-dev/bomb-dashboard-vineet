import React, { useMemo } from 'react';
import styled from 'styled-components';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import moment from 'moment';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { roundAndFormatNumber } from '../../../0x';
import { getDisplayBalance } from '../../../utils/formatBalance';
import BombImage from '../../../assets/img/bomb.png';
import BShareImage from '../../../assets/img/bshare-512.png';
import BombBTCBImage from '../../../assets/img/bomb-bitcoin-LP.png';
import BShareBNBImage from '../../../assets/img/bshare-bnb-LP.png';
import Bbond from '../../../assets/img/bbond-512.png';
import RingImage from '../../../assets/img/ring.svg';
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';

const BombFinanceSummary: React.FC<any> = ({ bombFinance, details }) => {
  // const BOMB=getDisplayBalance(useTokenBalance(bombFinance.BOMB));
  // const BSHARE=getDisplayBalance(useTokenBalance(bombFinance.BSHARE));
  // const BBOND=getDisplayBalance(useTokenBalance(bombFinance.BBOND));
  // const BOMB_BTCB=getDisplayBalance(useTokenBalance(bombFinance.externalTokens['BOMB-BTCB-LP']));
  // const BSHARE_BNB=getDisplayBalance(useTokenBalance(bombFinance.externalTokens['BSHARE-BNB-LP']));
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const { bomb, bshare, bbond } = details;
  const cashStat = useCashPriceInEstimatedTWAP();
  const livetwap = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const lastCashStat = useCashPriceInLastTWAP();
  const lasttwap = (Number(lastCashStat) / 100000000000000).toFixed(4);
  const tvl = useTotalValueLocked();
  return (
    <>
      <Grid xs={12} style={{ marginBottom: '12px' }}>
        <Paper style={{ background: 'rgba(32, 37, 67, 0.5)', height: '350px', borderRadius: '5px' }}>
          <div style={{ textAlign: 'center', paddingTop: '5px' }}>
            <p>Bomb Finance Summary</p>
            <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)', width: '80%' }} />
          </div>
          <Grid container spacing={3} style={{ textAlign: 'center' }}>
            {/* Supply & Price Table */}
            <Grid item xs={5} style={{ textAlign: 'center', paddingLeft: '10px' }}>
              <Grid container style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                <Grid item xs={3}></Grid>
                <Grid item xs={2}>
                  <span>Current Supply</span>
                </Grid>
                <Grid item xs={2}>
                  <span>Total Supply</span>
                </Grid>
                <Grid item xs={5}>
                  <span>Price</span>
                </Grid>
              </Grid>
              <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)', marginLeft: '100px' }} />
              <Grid container style={{ textAlign: 'center' }}>
                <Grid item xs={3}>
                  <img
                    alt="bomb"
                    style={{ width: '20px', float: 'left', marginRight: '3px', marginLeft: '10px' }}
                    src={BombImage}
                  />
                  $ BOMB
                </Grid>

                <Grid item xs={2}>
                  {roundAndFormatNumber(bomb.currentSupply, 2)}
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bomb.totalSupply, 2)}
                </Grid>
                <Grid item xs={5}>
                  <p style={{ padding: '0', margin: '0' }}>
                    ${roundAndFormatNumber(bomb.price.indollar, 2)}
                    <img
                      onClick={() => {
                        bombFinance.watchAssetInMetamask('BOMB');
                      }}
                      alt="metamask fox"
                      style={{ width: '30px', float: 'right', paddingTop: '10px' , cursor:'pointer'}}
                      src={MetamaskFox}
                    />
                  </p>
                  <p style={{ padding: '0' }}>{roundAndFormatNumber(bomb.price.inbnb, 2)}BTCB</p>
                </Grid>
              </Grid>
              <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)', marginLeft: '50px' }} />
              <Grid container style={{ textAlign: 'center' }}>
                <Grid item xs={3}>
                  <img
                    alt="b share"
                    style={{ width: '20px', float: 'left', marginRight: '3px', marginLeft: '10px' }}
                    src={BShareImage}
                  />
                  $ BSHARE
                </Grid>

                <Grid item xs={2}>
                  {roundAndFormatNumber(bshare.currentSupply, 2)}
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bshare.totalSupply, 2)}
                </Grid>
                <Grid item xs={5}>
                  <p style={{ padding: '0', margin: '0' }}>
                    ${roundAndFormatNumber(bshare.price.indollar, 2)}
                    <img
                      onClick={() => {
                        bombFinance.watchAssetInMetamask('BSHARE');
                      }}
                      alt="b share"
                      style={{ width: '30px', float: 'right', paddingTop: '10px', cursor:'pointer' }}
                      src={MetamaskFox}
                    />
                  </p>
                  <p style={{ padding: '0' }}>{roundAndFormatNumber(bshare.price.inbnb, 2)}BTCB</p>
                </Grid>
              </Grid>
              <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)', marginLeft: '50px' }} />
              <Grid container style={{ textAlign: 'center' }}>
                <Grid item xs={3}>
                  <img
                    alt="b bond"
                    style={{ width: '20px', float: 'left', marginRight: '3px', marginLeft: '10px' }}
                    src={Bbond}
                  />
                  $ BBOND
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bbond.currentSupply, 2)}
                </Grid>
                <Grid item xs={2}>
                  {roundAndFormatNumber(bbond.totalSupply, 2)}
                </Grid>
                <Grid item xs={5}>
                  <p style={{ padding: '0', margin: '0' }}>
                    ${roundAndFormatNumber(bbond.price.indollar, 2)}
                    <img
                      onClick={() => {
                        bombFinance.watchAssetInMetamask('BBOND');
                      }}
                      alt="metamask fox"
                      style={{ width: '30px', float: 'right', paddingTop: '10px' , cursor:'pointer'}}
                      src={MetamaskFox}
                    />
                  </p>
                  <p style={{ padding: '0' }}>{roundAndFormatNumber(bbond.price.inbnb, 2)}BTCB</p>
                </Grid>
              </Grid>
            </Grid>
            {/* Epoch */}
            <Grid item xs={2} style={{ textAlign: 'center' }}>
              <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Current Epoch</Typography>
              <Typography>{Number(currentEpoch)}</Typography>
              <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)', width: '80%' }} />
              <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>Next Epoch</Typography>
              <Typography>
                {' '}
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
              </Typography>
              <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)', width: '70%' }} />

              <p>
                <span style={{ fontSize: '0.9rem' }}>Live TWAP :</span>{' '}
                <span style={{ color: ' #00E8A2' }}>{livetwap}</span>
              </p>
              <p>
                <span style={{ fontSize: '0.9rem' }}>TVL :</span>{' '}
                <span style={{ color: ' #00E8A2' }}>{roundAndFormatNumber(Number(tvl), 2)}</span>
              </p>
              <p>
                <span style={{ fontSize: '0.9rem' }}>Last Epoch TWAP :</span>
                <span style={{ color: ' #00E8A2' }}>{lasttwap}</span>
              </p>
            </Grid>
            {/* Percentages */}
            <Grid item xs={5} style={{ textAlign: 'left', paddingLeft: '40px' }}>
              <Box p={2} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <img alt="ring" style={{ width: '150px', position: 'absolute', marginRight: '80px' }} src={RingImage} />{' '}
                <div
                  style={{
                    height: '100px',
                    width: '100px',
                    backgroundColor: '#373747',
                    borderRadius: '50%',
                    marginRight: '80px',
                    marginTop: '25px',
                  }}
                >
                  <h3 style={{ color: 'white', marginTop: '35px' }}>$ 10,451</h3>
                  <h5 style={{ color: '#5DFDB0', margin: '2px' }}>+22 %</h5>
                </div>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <p style={{ fontSize: '0.9rem' }}>
                    <img alt="bomb" style={{ width: '15px' }} src={BombImage} /> Bomb: <strong>17%</strong>
                  </p>
                  <p style={{ fontSize: '0.9rem' }}>
                    <img alt="b share" style={{ width: '15px' }} src={BShareImage} /> BShare: <strong>17%</strong>
                  </p>
                  <p style={{ fontSize: '0.9rem' }}>
                    <img alt="b bond" style={{ width: '15px' }} src={Bbond} /> BBond: <strong>17%</strong>
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <p style={{ fontSize: '0.9rem' }}>
                    <img alt="bomb btcb" style={{ width: '15px' }} src={BombBTCBImage} /> Bomb-BTCB:{' '}
                    <strong>17%</strong>
                  </p>
                  <p style={{ fontSize: '0.9rem' }}>
                    <img alt="bshare bnb" style={{ width: '15px' }} src={BShareBNBImage} /> BShare-BNB:{' '}
                    <strong>15%</strong>
                  </p>
                  <p style={{ fontSize: '0.9rem' }}>
                    <div
                      style={{
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#373747',
                        display: 'inline-block',
                      }}
                    ></div>{' '}
                    Others: <strong>17%</strong>
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};


export default BombFinanceSummary;
