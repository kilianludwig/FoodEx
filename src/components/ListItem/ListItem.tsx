import React from 'react';
import * as sc from './ListItem.sc';
import {FadeInView} from '../../utils/Animations/fade.animation';

interface ListItemProps {
  id?: string;
  title: string;
  distance: string;
  expiration: string;
  image?: string;
  onPress?: (id: string) => void;
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  id,
  title,
  distance,
  expiration,
  onPress,
  image, // TODO make flexible (Next JS)
}) => {
  return (
    <FadeInView>
      <sc.ItemCard elevation={2} onPress={() => onPress?.(id)}>
        <sc.ItemCardCover
          key={id}
          source={require('../../assets/images/banana.jpg')}
        />
        <sc.ItemCardInfoWrapper>
          <sc.ItemCardTitleWrapper>
            <sc.ItemCardTitle>{title}</sc.ItemCardTitle>
          </sc.ItemCardTitleWrapper>
          <sc.ItemCardDetailsWrapper>
            <sc.ItemCardDetails>{distance} km</sc.ItemCardDetails>
            <sc.ItemCardDetails>{expiration}</sc.ItemCardDetails>
          </sc.ItemCardDetailsWrapper>
        </sc.ItemCardInfoWrapper>
      </sc.ItemCard>
    </FadeInView>
  );
};
