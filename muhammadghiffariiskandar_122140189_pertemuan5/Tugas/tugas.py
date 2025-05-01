from abc import ABC, abstractmethod
from typing import List

class LibraryItem(ABC):
    """Kelas abstrak dasar untuk item perpustakaan."""
    
    def __init__(self, item_id: str, title: str, author: str) -> None:
        """Inisialisasi item perpustakaan.
        
        Args:
            item_id: Identifikasi unik untuk item
            title: Judul item
            author: Penulis item
        """
        self._item_id = item_id
        self._title = title
        self._author = author
        self._is_available = True

    @abstractmethod
    def display_info(self) -> str:
        """Menampilkan informasi item."""
        pass

    @property
    def is_available(self) -> bool:
        """Memeriksa ketersediaan item."""
        return self._is_available

    @is_available.setter
    def is_available(self, value: bool) -> None:
        """Mengatur status ketersediaan item."""
        self._is_available = value


class Book(LibraryItem):
    """Kelas yang merepresentasikan buku di perpustakaan."""

    def __init__(self, item_id: str, title: str, author: str, pages: int) -> None:
        """Inisialisasi buku.
        
        Args:
            item_id: Identifikasi unik untuk buku
            title: Judul buku
            author: Penulis buku
            pages: Jumlah halaman
        """
        super().__init__(item_id, title, author)
        self.__pages = pages

    def display_info(self) -> str:
        """Mengembalikan informasi buku yang telah diformat."""
        status = "Tersedia" if self.is_available else "Tidak Tersedia"
        return (f"Buku: {self._title} oleh {self._author} "
                f"({self._item_id}) - {self.__pages} halaman - {status}")


class Magazine(LibraryItem):
    """Kelas yang merepresentasikan majalah di perpustakaan."""

    def __init__(self, item_id: str, title: str, author: str, issue: str) -> None:
        """Inisialisasi majalah.
        
        Args:
            item_id: Identifikasi unik untuk majalah
            title: Judul majalah
            author: Penerbit/penulis majalah
            issue: Nomor/tanggal terbitan
        """
        super().__init__(item_id, title, author)
        self.__issue = issue

    def display_info(self) -> str:
        """Mengembalikan informasi majalah yang telah diformat."""
        status = "Tersedia" if self.is_available else "Tidak Tersedia"
        return (f"Majalah: {self._title} oleh {self._author} "
                f"({self._item_id}) - Edisi {self.__issue} - {status}")


class Library:
    """Kelas untuk mengelola item dan operasi perpustakaan."""

    def __init__(self) -> None:
        """Inisialisasi perpustakaan kosong."""
        self.__items: List[LibraryItem] = []

    def add_item(self, item: LibraryItem) -> None:
        """Menambahkan item ke perpustakaan."""
        self.__items.append(item)

    def display_all_items(self) -> None:
        """Menampilkan semua item di perpustakaan."""
        for item in self.__items:
            print(item.display_info())

    def search_item(self, search_term: str) -> List[LibraryItem]:
        """Mencari item berdasarkan judul atau ID.
        
        Args:
            search_term: Kata kunci untuk mencari judul atau ID
            
        Returns:
            Daftar item perpustakaan yang cocok
        """
        return [
            item for item in self.__items
            if search_term.lower() in item._title.lower() 
            or search_term.lower() == item._item_id.lower()
        ]


def main() -> None:
    """Fungsi utama untuk mendemonstrasikan fungsionalitas perpustakaan."""
    library = Library()

    # Membuat dan menambahkan contoh item
    items = [
        Book("B001", "Python Programming", "John Smith", 400),
        Book("B002", "Data Structures", "Jane Doe", 300),
        Magazine("M001", "Tech Today", "Tech Publishers", "2024-03")
    ]
    
    for item in items:
        library.add_item(item)

    # Menampilkan semua item
    print("Semua Item Perpustakaan:")
    library.display_all_items()

    # Demonstrasi pencarian
    print("\nHasil Pencarian untuk 'Python':")
    results = library.search_item("Python")
    for item in results:
        print(item.display_info())


if __name__ == "__main__":
    main()
