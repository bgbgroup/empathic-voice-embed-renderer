import { ConversationFrame } from '@/components/ConversationFrame';
import { OpenButton } from '@/components/OpenButton';
import { LayoutState, useLayoutStore } from '@/store/layout';
import { ConversationScreen } from '@/views/ConversationScreen';
import { ErrorScreen } from '@/views/ErrorScreen';
import { IntroScreen } from '@/views/IntroScreen';
import { useVoice } from '@humeai/voice-react';
import { FC } from 'react';
import { match } from 'ts-pattern';

export type ViewsProps = Record<never, never>;

export const Views: FC<ViewsProps> = () => {
  const layoutState = useLayoutStore((store) => store.state);
  const open = useLayoutStore((store) => store.open);
  const close = useLayoutStore((store) => store.close);

  const { connect, disconnect, status, error } = useVoice();

  console.debug('status:', status);
  console.debug('error:', error);

  if (layoutState === LayoutState.CLOSED) {
    return (
      <>
        <OpenButton
          status={status.value}
          onPress={() => {
            open();
          }}
        />
      </>
    );
  }

  const onConnect = () => {
    void connect()
      .then(() => {})
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <ConversationFrame
      onClose={() => {
        close();
        disconnect();
      }}
    >
      {match(status.value)
        .with('error', () => {
          return (
            <ErrorScreen
              errorType={error?.type ?? ('unknown' as const)}
              errorReason={error?.message ?? 'Unknown'}
              onConnect={onConnect}
              isConnecting={status.value === 'connecting'}
            />
          );
        })
        .with('disconnected', 'connecting', () => {
          return (
            <IntroScreen
              onConnect={onConnect}
              isConnecting={status.value === 'connecting'}
            />
          );
        })
        .with('connected', () => {
          return <ConversationScreen />;
        })
        .exhaustive()}
    </ConversationFrame>
  );
};
