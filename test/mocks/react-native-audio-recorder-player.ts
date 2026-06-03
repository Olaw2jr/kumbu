export default class AudioRecorderPlayer {
  startRecorder = jest.fn().mockResolvedValue('/tmp/sound.m4a');
  stopRecorder = jest.fn().mockResolvedValue('/tmp/sound.m4a');
  pauseRecorder = jest.fn().mockResolvedValue(undefined);
  resumeRecorder = jest.fn().mockResolvedValue(undefined);
  startPlayer = jest.fn().mockResolvedValue('/tmp/sound.m4a');
  stopPlayer = jest.fn().mockResolvedValue(undefined);
  pausePlayer = jest.fn().mockResolvedValue(undefined);
  resumePlayer = jest.fn().mockResolvedValue(undefined);
  seekToPlayer = jest.fn().mockResolvedValue(undefined);
  setVolume = jest.fn().mockResolvedValue(undefined);
  addRecordBackListener = jest.fn();
  removeRecordBackListener = jest.fn();
  addPlayBackListener = jest.fn();
  removePlayBackListener = jest.fn();
  setSubscriptionDuration = jest.fn();

  __simulateRecordProgress = (data: {
    currentPosition: number;
    currentMetering: number;
  }) => {
    const cb =
      this.addRecordBackListener.mock.calls.slice(-1)[0]?.[0];
    cb?.(data);
  };

  __simulatePlayProgress = (data: {
    currentPosition: number;
    duration: number;
  }) => {
    const cb =
      this.addPlayBackListener.mock.calls.slice(-1)[0]?.[0];
    cb?.(data);
  };
}
