import { useState } from "react";

import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onUpdateUser,
  onCardLike,
  onLogout,
}) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileOpen(false);
  };
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={handleEditClick} onLogout={onLogout} />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </section>
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={handleCloseModal}
        onUpdateUser={(data) => {
          onUpdateUser(data);
          handleCloseModal();
        }}
      />
    </div>
  );
}

export default Profile;
