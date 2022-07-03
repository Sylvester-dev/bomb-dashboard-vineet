import React,{useMemo} from 'react';
import styled from 'styled-components';
import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import { ArrowUpwardSharp,ArrowDownwardSharp,ShoppingCart } from '@material-ui/icons';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useBank from '../../../hooks/useBank';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useStakedBalance from '../../../hooks/useStakedBalance'
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useEarnings from '../../../hooks/useEarnings'
import useRedeem from '../../../hooks/useRedeem'
import useHarvest from '../../../hooks/useHarvest'
import useApprove,{ApprovalState} from '../../../hooks/useApprove'
import BombImage from '../../../assets/img/bomb.png';
import BShareImage from '../../../assets/img/bshare-512.png';
import BombBTCBImage from '../../../assets/img/bomb-bitcoin-LP.png';
import BShareBNBImage from '../../../assets/img/bshare-bnb-LP.png';

import {getDisplayBalance} from '../../../utils/formatBalance';


const BombFarms: React.FC<any> = () => {
  const bombStats = useBombStats();
  const tShareStats = useShareStats();
  const bombBtcb = useBank('BombBtcbLPBShareRewardPool');
  const bombBtcbstatsOnPool = useStatsForPool(bombBtcb);
  const bombBtcbstakedBalance = useStakedBalance(bombBtcb.contract, bombBtcb.poolId);
  const bombBtcbearnings = useEarnings(bombBtcb.contract, bombBtcb.earnTokenName, bombBtcb.poolId);
  const {onRedeem:onRedeemBombbtcb} = useRedeem(bombBtcb);
  const {onReward:onRewardBombbtcb} = useHarvest(bombBtcb);
  const [bombBtcbApproveStatus, bombBtcbApprove] = useApprove(bombBtcb.depositToken, bombBtcb.address);
  const bombBtcbStats = bombBtcb.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const bombBtcbPriceInDollars = useMemo(
    () => (bombBtcbStats ? Number(bombBtcbStats.priceInDollars).toFixed(2) : null),
    [bombBtcbStats],
  );
  const bombBtcbearnedInDollars = (Number(bombBtcbPriceInDollars) * Number(getDisplayBalance(bombBtcbearnings))).toFixed(2);

  const bshareBnb = useBank('BshareBnbLPBShareRewardPool');
  const bshareBnbstatsOnPool = useStatsForPool(bshareBnb);
  const bshareBnbstakedBalance = useStakedBalance(bshareBnb.contract, bshareBnb.poolId);
  const bshareBnbearnings = useEarnings(bshareBnb.contract, bshareBnb.earnTokenName, bshareBnb.poolId);
  const {onRedeem:onRedeemBsharebnb} = useRedeem(bshareBnb);
  const {onReward:onRewardBsharebnb} = useHarvest(bshareBnb);
  const [bshareBnbApproveStatus, bsharebnbApprove] = useApprove(bshareBnb.depositToken, bshareBnb.address);
  const bshareBnbStats = bshareBnb.earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const bSharebnbPriceInDollars = useMemo(
    () => (bshareBnbStats ? Number(bshareBnbStats.priceInDollars).toFixed(2) : null),
    [bshareBnbStats],
  );
  const bshareBnbearnedInDollars = (Number(bSharebnbPriceInDollars) * Number(getDisplayBalance(bshareBnbearnings))).toFixed(2);
  
  // Details of bombBtcb and bshareBnb token for farm
  const bombbtcb = {
    heading:'BOMB-BTCB',
    bg:false,
    icon:bombBtcb.depositTokenName,
    tvl:bombBtcbstatsOnPool?.TVL,
    yourstake:getDisplayBalance(bombBtcbstakedBalance, bombBtcb.depositToken.decimal),
    yourstakeInDollars:bombBtcbearnedInDollars,
    approve:bombBtcbApproveStatus!==ApprovalState.NOT_APPROVED,
    returns:bombBtcbstatsOnPool?.dailyAPR,
    earned:getDisplayBalance(bombBtcbearnings),
    deposit:bombBtcbApprove,
    withdraw: onRedeemBombbtcb,
    claimrewards:onRewardBombbtcb,
  };
  const bsharebnb = {
    heading:'BSHARE-BNB',
    bg:false,
    icon:bshareBnb.depositTokenName,
    tvl:bshareBnbstatsOnPool?.TVL,
    yourstakeInDollars:bshareBnbearnedInDollars,
    yourstake:getDisplayBalance(bshareBnbstakedBalance, bshareBnb.depositToken.decimal),
    returns:bshareBnbstatsOnPool?.dailyAPR,
    approve:bshareBnbApproveStatus!==ApprovalState.NOT_APPROVED,
    earned:getDisplayBalance(bshareBnbearnings),
    deposit:bsharebnbApprove,
    withdraw:onRedeemBsharebnb,
    claimrewards:onRewardBsharebnb,
  };

  const canWithdraw = useWithdrawCheck();
  const canClaimReward = useClaimRewardCheck();

  return (

    <>
     <Styleddiv>
       <Grid xs={12} style={{ marginBottom: '40px' }}>
          <Paper style={{ background: 'rgba(32, 37, 67, 0.5)', borderRadius: '5px' }}>
            {/* BOMB-BTCB */}
            <Box style={{ textAlign: 'left', padding: '10px 20px 0px 20px' }}>
              <h3 style={{ color: 'white' }}>
                Bomb Farms
                <span style={{ float: 'right' }}>
                  <Button
                    style={{
                      border: 'solid 2px',
                      borderRadius: '20px',
                    }}
                  >
                    Claim All
                    <img alt="b share" style={{ width: '15px', marginLeft: '5px' }} src={BShareImage} />
                  </Button>
                </span>
              </h3>
              <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
            </Box>
            <Box p={4} style={{ textAlign: 'left', paddingTop: '10px' }}>
              <img alt="bomb btc" style={{ width: '60px', float: 'left', marginRight: '10px' }} src={BombBTCBImage} />
              <h3 style={{ color: 'white', marginTop: '20px' }}>
                BOMB-BTCB
                <span
                  style={{
                    color: 'white',
                    fontSize: '0.7rem',
                    padding: '3px',
                    borderRadius: '3px',
                    marginLeft: '20px',
                    verticalAlign: 'center',
                    backgroundColor: 'rgba(0, 232, 162, 0.5)',
                  }}
                >
                  Recommended
                </span>
                <span style={{ float: 'right' }}>
                  TVL :{' '} <strong>${bombbtcb.tvl}</strong>
                </span>
              </h3>
              <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)' }} />
            </Box>
            <Grid container spacing={4} style={{ textAlign: 'center' }}>
              <Grid item xs={2} style={{ padding: '0' }}>
                Daily returns:
                <h1 style={{ color: 'white', marginTop: '20px', fontSize: '2rem' }}>{bombbtcb.returns}%</h1>
              </Grid>
              <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
                Your Stake:
                <p>
                  <img alt="b share" style={{ width: '20px' }} src={BombBTCBImage} />
                  {bombbtcb.yourstake}
                </p>
                <p>≈ ${bombbtcb.yourstakeInDollars}</p>
              </Grid>
              <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
                Earned:
                <p>
                  <img alt="bomb" style={{ width: '20px' }} src={BShareImage} />
                  {bombbtcb.earned}
                </p>
                <p>≈ ${bombbtcb.earned}</p>
              </Grid>
              <Grid item xs={6} style={{ padding: '0' }}>
                <Box style={{ textAlign: 'center', marginTop: '60px' }}>
                  <StyledButton disabled={bombbtcb.approve}
                   onClick={() => {
                    bombbtcb.deposit();
                   }} style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}>
                     <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                    <div>
                     Deposit 
                    </div>
                    <div>
                    <ArrowUpwardSharp />
                    </div>
                  </div>
                  </StyledButton>
                  <StyledButton  disabled={Number(bombbtcb.yourstake) === 0 || (!canWithdraw && !canClaimReward)}
                   onClick={() => {
                    bombbtcb.withdraw();
                   }} style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                    <div>
                     Withdraw 
                    </div>
                    <div>
                    <ArrowDownwardSharp />
                    </div>
                  </div>
                  </StyledButton>
                  <StyledButton 
                   onClick={() => {
                    bombbtcb.claimrewards();
                  }}
                  disabled={Number(bombbtcb.earned) === 0 || !canClaimReward}
                    style={{
                      width: '30%',
                      border: 'solid 2px',
                      borderRadius: '20px',
                    }}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                    <div>
                     Claim Rewards 
                    </div>
                    <div>
                      <img alt="b share" style={{ width: '15px', marginLeft: '5px' }}  src={BShareImage} />
                    </div>
                  </div>
                  </StyledButton>
                </Box>
              </Grid>
            </Grid>
            {/* BSHARE-BNB */}
            <Box p={4} style={{ textAlign: 'left' }}>
              <img
                alt="b share bnb"
                style={{ width: '60px', float: 'left', marginRight: '10px' }}
                src={BShareBNBImage}
              />
              <h3 style={{ color: 'white', marginTop: '20px' }}>
                BSHARE-BNB
                <span
                  style={{
                    color: 'white',
                    fontSize: '0.7rem',
                    padding: '3px',
                    borderRadius: '3px',
                    marginLeft: '20px',
                    verticalAlign: 'center',
                    backgroundColor: 'rgba(0, 232, 162, 0.5)',
                  }}
                >
                  Recommended
                </span>
                <span style={{ float: 'right' }}>
                  TVL : <strong>${bsharebnb.tvl}</strong>
                </span>
              </h3>

              <hr style={{ border: '0.5px solid rgba(195, 197, 203, 0.75)' }} />
            </Box>
            <Grid container spacing={4} style={{ textAlign: 'center' }}>
              <Grid item xs={2} style={{ padding: '0' }}>
                Daily returns:
                <h1 style={{ color: 'white', marginTop: '20px', fontSize: '2rem' }}>{bsharebnb.returns}%</h1>
              </Grid>
              <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
                Your Stake:
                <p>
                  <img alt="b share" style={{ width: '20px' }} src={BShareBNBImage} />
                 {bsharebnb.yourstake}
                </p>
                <p>≈ ${bsharebnb.yourstakeInDollars}</p>
              </Grid>
              <Grid item xs={2} style={{ padding: '0', textAlign: 'left' }}>
                Earned:
                <p>
                  <img alt="bomb" style={{ width: '20px' }} src={BShareImage} />
                  {bsharebnb.earned}
                </p>
                <p>≈ ${bsharebnb.earned}</p>
              </Grid>
              <Grid item xs={6} style={{ padding: '0' }}>
                <Box style={{ textAlign: 'center', marginTop: '60px', paddingBottom: '30px' }}>
                  <StyledButton disabled={bsharebnb.approve}
            onClick={() => {
              bsharebnb.deposit();
            }} style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                    <div>
                     Deposit 
                    </div>
                    <div>
                    <ArrowUpwardSharp />
                    </div>
                  </div>
                  </StyledButton>
                  <StyledButton disabled={Number(bsharebnb.yourstake) === 0 || (!canWithdraw && !canClaimReward)}
            onClick={() => {
              bsharebnb.withdraw();
            }} style={{ width: '25%', border: 'solid 2px', borderRadius: '20px', marginRight: '10px' }}>
                   <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                    <div>
                     Withdraw 
                    </div>
                    <div>
                    <ArrowDownwardSharp />
                    </div>
                  </div>
                  </StyledButton>
                  <StyledButton disabled={Number(bsharebnb.earned) === 0 || !canClaimReward}
            onClick={() => {
              bsharebnb.claimrewards();
            }}
                    style={{
                      width: '30%',
                      border: 'solid 2px',
                      borderRadius: '20px',
                    }}
                  >
                  <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row'}}>
                    <div>
                     Claim Rewards 
                    </div>
                    <div>
                      <img alt="b share" style={{ width: '15px', marginLeft: '5px' }}  src={BShareImage} />
                    </div>
                  </div>
                  </StyledButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Styleddiv>
    </>
  );
};

// Styled CSS
const Styleddiv = styled.div`
  margin: 10px;
  background: #23284bbf;
  border: 1px solid #728cdf;
  border-radius: 10px;
  padding: 10px;
  h1{
    text-transform:none;
    color:white;
    font-size: 1.25rem;
  }
`;

const StyledButton = styled.button`
  background: transparent;
  border: 2px solid currentColor;
  color: ${(p) => (p.disabled ? '#FFFFFF80' : '#FFFFFF')};
  border-radius: 20px;
  margin-right: 10px;
  padding: 5px;
  margin: 0 auto;
  cursor:${p=>p.disabled?'not-allowed':'pointer'};
  &:hover{
    background-color: ${p=>p.disabled?'transparent':'#FFFFFF'};
    color:${p=>p.disabled?'#FFFFFF80':'black'};
  }
`;

export default BombFarms;
