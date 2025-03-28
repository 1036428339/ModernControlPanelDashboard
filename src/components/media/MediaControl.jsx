import { useState } from 'react';
import { FaMusic, FaVolumeUp, FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import { ToggleButton } from '../common/Button';
import StatusIndicator from '../common/StatusIndicator';
import theme from '../../theme';

/**
 * 影音控制模块
 * 用于控制果园背景音乐和广播系统
 */
const MediaControl = () => {
  // 音乐播放状态
  const [playerState, setPlayerState] = useState({
    isPlaying: true,
    currentTrack: 2,
    volume: 70,
    shuffle: false,
    repeat: false,
    duration: 237, // 总时长（秒）
    currentTime: 75, // 当前播放位置（秒）
  });

  // 广播系统状态
  const [broadcastState, setBroadcastState] = useState({
    isEnabled: false,
    volume: 85,
    lastBroadcast: '今天 09:15',
    scheduledBroadcasts: [
      { time: '08:00', message: '早间天气预报', days: ['每天'] },
      { time: '12:00', message: '午间提醒', days: ['工作日'] },
      { time: '18:00', message: '晚间总结', days: ['工作日'] },
    ],
  });

  // 音乐播放列表
  const playlist = [
    { id: 1, title: '晨曦旋律', artist: '自然之声', duration: 185, category: '舒缓' },
    { id: 2, title: '雨后森林', artist: '自然之声', duration: 237, category: '舒缓' },
    { id: 3, title: '丰收欢歌', artist: '民谣合集', duration: 198, category: '欢快' },
    { id: 4, title: '田园小调', artist: '民谣合集', duration: 210, category: '欢快' },
    { id: 5, title: '夜晚虫鸣', artist: '自然之声', duration: 245, category: '舒缓' },
  ];

  // 获取当前播放的音乐
  const currentMusic = playlist.find(item => item.id === playerState.currentTrack) || playlist[0];

  // 处理播放/暂停
  const handlePlayPause = () => {
    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  // 处理下一曲
  const handleNext = () => {
    const currentIndex = playlist.findIndex(item => item.id === playerState.currentTrack);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setPlayerState(prev => ({
      ...prev,
      currentTrack: playlist[nextIndex].id,
      currentTime: 0,
    }));
  };

  // 处理上一曲
  const handlePrevious = () => {
    const currentIndex = playlist.findIndex(item => item.id === playerState.currentTrack);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setPlayerState(prev => ({
      ...prev,
      currentTrack: playlist[prevIndex].id,
      currentTime: 0,
    }));
  };

  // 处理音量调整
  const handleVolumeChange = (value) => {
    setPlayerState(prev => ({
      ...prev,
      volume: value,
    }));
  };

  // 处理进度调整
  const handleProgressChange = (value) => {
    setPlayerState(prev => ({
      ...prev,
      currentTime: value,
    }));
  };

  // 处理随机播放
  const handleToggleShuffle = () => {
    setPlayerState(prev => ({
      ...prev,
      shuffle: !prev.shuffle,
    }));
  };

  // 处理循环播放
  const handleToggleRepeat = () => {
    setPlayerState(prev => ({
      ...prev,
      repeat: !prev.repeat,
    }));
  };

  // 处理广播系统开关
  const handleToggleBroadcast = () => {
    setBroadcastState(prev => ({
      ...prev,
      isEnabled: !prev.isEnabled,
    }));
  };

  // 处理广播音量调整
  const handleBroadcastVolumeChange = (value) => {
    setBroadcastState(prev => ({
      ...prev,
      volume: value,
    }));
  };

  // 格式化时间（秒 -> mm:ss）
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <h2 style={{ 
        color: theme.neutral.darkGrey,
        marginBottom: theme.spacing.lg,
        fontWeight: theme.typography.fontWeight.medium,
      }}>
        影音控制
      </h2>
      
      {/* 音乐播放器 */}
      <Card 
        title="音乐播放器" 
        icon={<FaMusic />}
        minHeight="200px"
      >
        <div style={{ padding: theme.spacing.sm }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.md,
          }}>
            <div>
              <div style={{ 
                fontSize: theme.typography.fontSize.large,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.neutral.darkGrey,
              }}>
                {currentMusic.title}
              </div>
              <div style={{ 
                fontSize: theme.typography.fontSize.small,
                color: theme.neutral.grey,
              }}>
                {currentMusic.artist} · {currentMusic.category}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StatusIndicator 
                status={playerState.isPlaying ? 'active' : 'inactive'} 
                label={playerState.isPlaying ? '播放中' : '已暂停'}
              />
            </div>
          </div>
          
          {/* 进度条 */}
          <div style={{ marginBottom: theme.spacing.md }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: theme.typography.fontSize.small,
              color: theme.neutral.grey,
              marginBottom: theme.spacing.xs,
            }}>
              <span>{formatTime(playerState.currentTime)}</span>
              <span>{formatTime(currentMusic.duration)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={currentMusic.duration} 
              value={playerState.currentTime} 
              onChange={(e) => handleProgressChange(parseInt(e.target.value))} 
              style={{ width: '100%' }}
            />
          </div>
          
          {/* 控制按钮 */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: theme.spacing.md,
            marginBottom: theme.spacing.lg,
          }}>
            <button 
              onClick={handleToggleShuffle}
              style={{
                background: 'none',
                border: 'none',
                color: playerState.shuffle ? theme.primary : theme.neutral.grey,
                fontSize: theme.typography.fontSize.medium,
                cursor: 'pointer',
              }}
            >
              <FaRandom />
            </button>
            
            <button 
              onClick={handlePrevious}
              style={{
                background: 'none',
                border: 'none',
                color: theme.neutral.darkGrey,
                fontSize: theme.typography.fontSize.large,
                cursor: 'pointer',
              }}
            >
              <FaStepBackward />
            </button>
            
            <button 
              onClick={handlePlayPause}
              style={{
                backgroundColor: theme.primary,
                color: theme.neutral.white,
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: theme.typography.fontSize.large,
                cursor: 'pointer',
                boxShadow: theme.shadows.small,
              }}
            >
              {playerState.isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            
            <button 
              onClick={handleNext}
              style={{
                background: 'none',
                border: 'none',
                color: theme.neutral.darkGrey,
                fontSize: theme.typography.fontSize.large,
                cursor: 'pointer',
              }}
            >
              <FaStepForward />
            </button>
            
            <button 
              onClick={handleToggleRepeat}
              style={{
                background: 'none',
                border: 'none',
                color: playerState.repeat ? theme.primary : theme.neutral.grey,
                fontSize: theme.typography.fontSize.medium,
                cursor: 'pointer',
              }}
            >
              <FaRedo />
            </button>
          </div>
          
          {/* 音量控制 */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md,
          }}>
            <FaVolumeUp style={{ color: theme.neutral.darkGrey }} />
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={playerState.volume} 
              onChange={(e) => handleVolumeChange(parseInt(e.target.value))} 
              style={{ flex: 1 }}
            />
            <span style={{ 
              fontSize: theme.typography.fontSize.small,
              color: theme.neutral.darkGrey,
              width: '40px',
              textAlign: 'right',
            }}>
              {playerState.volume}%
            </span>
          </div>
        </div>
      </Card>
      
      {/* 播放列表 */}
      <Card 
        title="播放列表" 
        icon={<FaMusic />}
        minHeight="200px"
        style={{ marginTop: theme.spacing.xl }}
      >
        <div style={{ padding: theme.spacing.sm }}>
          <ul style={{ 
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            {playlist.map((track) => (
              <li 
                key={track.id}
                style={{ 
                  padding: theme.spacing.md,
                  borderBottom: `1px solid ${theme.neutral.lightGrey}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: track.id === playerState.currentTrack ? theme.neutral.lightGrey : 'transparent',
                  borderRadius: theme.borderRadius.small,
                  cursor: 'pointer',
                }}
                onClick={() => setPlayerState(prev => ({
                  ...prev,
                  currentTrack: track.id,
                  currentTime: 0,
                  isPlaying: true,
                }))}
              >
                <div>
                  <div style={{ 
                    fontWeight: track.id === playerState.currentTrack ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
                    color: track.id === playerState.currentTrack ? theme.primary : theme.neutral.darkGrey,
                  }}>
                    {track.title}
                  </div>
                  <div style={{ 
                    fontSize: theme.typography.fontSize.small,
                    color: theme.neutral.grey,
                  }}>
                    {track.artist} · {track.category}
                  </div>
                </div>
                
                <div style={{ 
                  fontSize: theme.typography.fontSize.small,
                  color: theme.neutral.grey,
                }}>
                  {formatTime(track.duration)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      
      {/* 广播系统 */}
      <Card 
        title="广播系统" 
        icon={<FaVolumeUp />}
        minHeight="200px"
        style={{ marginTop: theme.spacing.xl }}
      >
        <div style={{ padding: theme.spacing.sm }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing.lg,
          }}>
            <div>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                系统状态
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StatusIndicator 
                  status={broadcastState.isEnabled ? 'active' : 'inactive'} 
                  label={broadcastState.isEnabled ? '已启用' : '已禁用'}
                  size="large"
                />
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey }}>
                上次广播
              </div>
              <div style={{ color: theme.neutral.darkGrey }}>
                {broadcastState.lastBroadcast}
              </div>
            </div>
            
            <div>
              <ToggleButton 
                isOn={broadcastState.isEnabled} 
                onToggle={handleToggleBroadcast} 
              />
            </div>
          </div>
          
          {/* 广播音量 */}
          <div style={{ 
            marginBottom: theme.spacing.lg,
          }}>
            <div style={{ fontSize: theme.typography.fontSize.small, color: theme.neutral.grey, marginBottom: theme.spacing.xs }}>
              广播音量
            </div>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
            }}>
              <FaVolumeUp style={{ color: theme.neutral.darkGrey }} />
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={broadcastState.volume} 
                onChange={(e) => handleBroadcastVolumeChange(parseInt(e.target.value))} 
                disabled={!broadcastState.isEnabled}
                style={{ flex: 1 }}
              />
              <span style={{ 
                fontSize: theme.typography.fontSize.small,
                color: theme.neutral.darkGrey,
                width: '40px',
                textAlign: 'right',
              }}>
                {broadcastState.volume}%
              </span>
            </div>
          </div>
          
          {/* 定时广播 */}
          <div>
            <div style={{ 
              fontSize: theme.typography.fontSize.small, 
              color: theme.neutral.grey, 
              marginBottom: theme.spacing.sm,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span>定时广播计划</span>
              <Button 
                type="primary"
                size="small"
                disabled={!broadcastState.isEnabled}
              >
                添加计划
              </Button>
            </div>
            
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}>
              {broadcastState.scheduledBroadcasts.map((broadcast, index) => (
                <li 
                  key={index}
                  style={{ 
                    padding: theme.spacing.md,
                    borderBottom: `1px solid ${theme.neutral.lightGrey}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ 
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.neutral.darkGrey,
                    }}>
                      {broadcast.time} - {broadcast.message}
                    </div>
                    <div style={{ 
                      fontSize: theme.typography.fontSize.small,
                      color: theme.neutral.grey,
                    }}>
                      重复: {broadcast.days.join(', ')}
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      type="secondary"
                      size="small"
                      disabled={!broadcastState.isEnabled}
                    >
                      编辑
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MediaControl;