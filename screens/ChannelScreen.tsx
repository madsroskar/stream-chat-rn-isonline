import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  useAttachmentPickerContext,
  useChatContext,
} from 'stream-chat-react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/elements';

import {AppContext} from '../AppContext';
import {NavigationParametersList} from '../Navigation';
import {useStreamChat} from '../useStreamChat';

interface ChannelScreenProps {
  navigation: StackNavigationProp<NavigationParametersList, 'Channel'>;
}

const CustomMessageList = () => {
  const {isOnline} = useChatContext();

  if (!isOnline) {
    return (
      <View>
        <Text>App is not online</Text>
      </View>
    );
  }

  return <MessageList />;
};

export const ChannelScreen: React.FC<ChannelScreenProps> = () => {
  const {channel, thread: selectedThread} = useContext(AppContext);
  const headerHeight = useHeaderHeight();
  const {setTopInset} = useAttachmentPickerContext();

  const {client, i18nInstance} = useStreamChat();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  /**
   * TODO: The `as any` assertion on `channel` is a result
   * of the type definition in stream-chat not being permissibe
   * enough for the local type here.
   *
   * An issue is created for this.
   * */
  return (
    <Chat client={client} i18nInstance={i18nInstance}>
      <Channel
        channel={channel as any}
        keyboardVerticalOffset={headerHeight}
        thread={selectedThread}>
        <View style={{flex: 1}}>
          <CustomMessageList />
          <MessageInput />
        </View>
      </Channel>
    </Chat>
  );
};
