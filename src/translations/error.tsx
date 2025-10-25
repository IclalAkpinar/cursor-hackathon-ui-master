export const translations: Record<string, string> = {
  "Access Denied. Super admins cannot be updated.":
    "Erişim Engellendi. Sadece satın alma, atölye ve milli teknoloji roller güncellenebilir.",
  "E11000 duplicate key error phone_1":
    "Bu telefon numarası ile kayıtlı bir kullanıcı zaten mevcut.",
  "E11000 duplicate key error email_1":
    "Bu email ile kayıtlı bir kullanıcı zaten mevcut.",
  "A competition with the same name already exists.":
    "Bu isim ile kayıtlı bir yarışma adı zaten mevcut.",
  "Error creating category: Category with the name already exists.":
    "Bu isim ile kayıtlı bir kategori zaten mevcut.",
  "A category with the same name already exists.":
    "Bu isim ile kayıtlı bir kategori zaten mevcut.",
  "Error deleting admin: Only admins with roles purchase, workshop, or national-tech can be deleted.":
    "Yalnızca satın alma, atölye veya milli teknoloji rollerine sahip yöneticiler silinebilir",
  "Error fetching category by ID: Category not found with the specified ID":
    "Kategoriyi kimliğe göre alma hatası: Belirtilen kimliğe sahip kategori bulunamadı",
  "Access Denied. Only national-tech or super-admin users can create category.":
    "Erişim Engellendi. Sadece national-tech veya super-admin kullanıcıları kategori oluşturabilir.",
  "Access Denied. Only national-tech or super-admin users can update categories.":
    "Erişim Engellendi. Sadece national-tech veya süper-admin kullanıcıları kategorileri güncelleyebilir.",
  "Access Denied. Only national-tech or super-admin users can delete categories.":
    "Erişim Engellendi. Sadece national-tech veya süper-admin kullanıcıları kategorileri silebilir.",
  "Error creating competition: A competition with the same name already exists.":
    "Yarışma oluşturulurken hata oluştu: Aynı adlı bir yarışma zaten mevcut.",
  "Duplicate process name found in the request. Please ensure all process names are unique.":
    "Aynı isim ile kayıtlı aşama zaten mevcut",
  "The team logo format is invalid. It must be a PNG, JPG, or JPEG base64 string.":
    "Takım logosu biçimi geçersiz. PNG, JPG veya JPEG base64 dizesi olmalı.",
  "Duplicate values found: IdentityNumbers:":
    "Aynı kimlik numarası ile kayıtlı üye zaten mevcut.",
  "Duplicate values found: Phones: ":
    "Aynı telefon numarası ile kayıtlı üye zaten mevcut.",
  "Duplicate values found: Emails: ":
    "Aynı email ile kayıtlı üye zaten mevcut.",
  "Duplicate process name in the API request.": "Aşama isimleri aynı olamaz!",
  "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: team-management-service.teamInfo index: teamLogo_1":
    "Fotoğraf içeriği takıma özel olmalı, bu fotoğraf daha önce başka bir takım tarafınfan kullanılmıştır!",
  "KVKK approval is required.": "KVKK onayı zorunludur!",
  "E11000 duplicate key error collection: team-management-service.teamInfo index: teamName_1":
    "Bu isimle kayıtlı bir takım var, lütfen başka bir takım ismi deneyin.",
  "Error creating team person: A person with the same identityNumber already exists in this team.":
    "Bu takımda aynı TC ile kullanıcı zaten var.",
  "Super-admin role cannot be updated.":
    "Süper Admin rolünü güncelleme yetkisi yoktur!",
  "Cannot delete a super-admin.": "Süper Admin rolünü silme yetkisi yoktur!",

  "A team with the same teamLogo already exists. ":
    "Bu logo ile kayıtlı bir takım zaten mevcut.",
  "A team with the same teamName already exists. ":
    "Bu isimle kayıtlı bir takım zaten mevcut.",
  "A team with the same teamName, teamLogo already exists.":
    "Bu isim ve logo ile kayıtlı bir takım zaten mevcut.",
  "Duplicate values found: IdentityNumbers: ":
    "Bu kimlik numarasıyla kayıtlı bir kullanıcı zaten mevcut.",
  "A team with the same teamName already exists.": "zaten mevcut",
  "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: team-managenment-service.teamInfo index: teamLogo_1":
    "Bu logo başka bir takım tarafından kullanılmıştır!",
  "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error teamName_1":
    "Bu isimle kayıtlı bir takım zaten mevcut.",
  "A competition with the same link already exists.":
    "Bu link ile kayıtlı yarışma zaten mevcut.",
  "Duplicate competition name found under the same category.":
    "Aynı kategori altında tekrarlanan yarışma adı bulundu.",
  "Duplicate competition link found. Please use a unique link.":
    "Tekrarlanan yarışma linki bulundu. Lütfen benzersiz bir link kullanın.",
  "A team cannot have more than one captain. Please update the existing captain or remove the new captain assignment.":
    "A team cannot have more than one captain. Please update the existing captain or remove the new captain assignment.",
  "A team cannot have more than one advisor. Please update the existing advisor or remove the new advisor assignment.":
    "Bir takımın birden fazla danışmanı olamaz. Lütfen mevcut danışmanı güncelleyin veya yeni danışman atamasını kaldırın.",
  "Failed to fetch team persons by role and teamInfoId." :
    "Rol ve teamInfoId'ye göre takım üyeleri alınamadı.",
  "Access Denied. Insufficient permissions." :
    "Erişim engellendi, yetkiniz yoktur.",
  "A product list with the same name already exists.":
    "Bu liste adı zaten mevcut, lütfen başka bir isim deneyin.",
};
