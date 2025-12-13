import { useState, useEffect, useRef } from 'react';
import { mapAPI } from '../../utils/api';
import SearchInput from '../search/SearchInput';
import SearchSuggestions from '../search/SearchSuggestions';

export default function SearchBar({ 
  mockSearch, 
  currentTheme, 
  primaryText,
  currentLocation = { lat: 21.0285, lon: 105.8542, city: 'Hanoi' }
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        if (import.meta.env.DEV) {
          console.error('Error loading recent searches:', e);
        }
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const getNearbyLocations = () => {
    const nearby = [
      { name: 'Hà Nội', lat: 21.0285, lon: 105.8542 },
      { name: 'Hồ Chí Minh', lat: 10.8231, lon: 106.6297 },
      { name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022 },
      { name: 'Hải Phòng', lat: 20.8449, lon: 106.6881 },
      { name: 'Cần Thơ', lat: 10.0452, lon: 105.7469 },
    ];
    return nearby.filter(loc => 
      loc.name.toLowerCase() !== currentLocation.city?.toLowerCase()
    ).slice(0, 3);
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setQuery(searchQuery);
    setShowSuggestions(false);
    
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    if (mockSearch) {
      mockSearch(searchQuery);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (value.trim().length >= 3) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await mapAPI.searchLocation(value);
          setSuggestions(results.results?.slice(0, 5) || []);
          setShowSuggestions(true);
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error('Search error:', error);
          }
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }, 800); 
    } else if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (typeof suggestion === 'string') {
      handleSearch(suggestion);
    } else {
      handleSearch(suggestion.nameVi || suggestion.name);
      if (mockSearch) {
        mockSearch(suggestion.nameVi || suggestion.name);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const nearbyLocations = getNearbyLocations();
  const displaySuggestions = query.trim().length > 0 
    ? suggestions 
    : [...recentSearches.map(s => ({ name: s, nameVi: s })), ...nearbyLocations];

  return (
    <div ref={searchRef} className="relative" style={{ maxWidth: '100%', width: '100%' }}>
      <SearchInput
        query={query}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        setShowSuggestions={setShowSuggestions}
        primaryText={primaryText}
        currentTheme={currentTheme}
      />

      {showSuggestions && (
        <SearchSuggestions
          displaySuggestions={displaySuggestions}
          handleSuggestionClick={handleSuggestionClick}
          query={query}
          recentSearches={recentSearches}
          nearbyLocations={nearbyLocations}
          primaryText={primaryText}
        />
      )}
    </div>
  );
}
