import React from 'react';
import { 
  IoChatbubblesOutline, 
  IoNotificationsOutline,
  IoMenuOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoGridOutline,
  IoPersonCircleOutline,
  IoSettingsOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoTrashOutline,
  IoDocumentOutline,
  IoReorderTwoOutline
} from 'react-icons/io5';

const Icon = ({ name, size = 24 }: { name: string; size?: number | string }) => {
  const iconSize = typeof size === 'number' ? size : parseInt(size as string);

  const renderIcon = () => {
    switch (name) {
      case 'chat-double':
        return <IoChatbubblesOutline size={iconSize} color="grey" />;

      case 'messages-alert':
        return <IoNotificationsOutline size={iconSize} color="grey" />;

      case 'menu-list':
        return <IoMenuOutline size={iconSize} color="grey" />;

      case 'sidebar-toggle':
        return <IoChevronBackOutline size={20} color="grey" />;

      case 'sidebar-toggle-right':
        return <IoChevronForwardOutline size={20} color="grey" />;

      case 'grid-menu':
        return <IoGridOutline size={iconSize} color="grey" />;

      case 'user-profile':
        return <IoPersonCircleOutline size={iconSize} color="grey" />;

      case 'settings-gear':
        return <IoSettingsOutline size={iconSize} color="grey" />;

      case 'team-users':
        return <IoPeopleOutline size={iconSize} color="grey" />;

      case 'hexagon-shield':
        return <IoShieldCheckmarkOutline size={iconSize} color="grey" />;

      case 'visibility':
        return <IoEyeOutline size={iconSize} color="#0f79f3" />;

      case 'bin':
        return <IoTrashOutline size={iconSize} color="grey" />;

      case 'file':
        return <IoDocumentOutline size={iconSize} color="gray" />;

      case 'drag':
        return <IoReorderTwoOutline size={iconSize} color="grey" />;

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'inline-flex' }}>
      {renderIcon()}
    </div>
  );
};

export default Icon;
