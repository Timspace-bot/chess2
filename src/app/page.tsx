'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CharacterSelection, Character } from "@/components/character-selection";

interface ChessPiece {
  name: string;
  description: string;
  role: string;
}

interface GameCard {
  id: number;
  title: string;
  titleImage?: string;
  price: string;
  bgColor: string;
  description: string;
  chessPieces: ChessPiece[];
}

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<'local' | 'multiplayer'>('local');
  const [selectedMultiplayerOption, setSelectedMultiplayerOption] = useState<'random' | 'private'>('random');
  const [selectedLocalSide, setSelectedLocalSide] = useState<'left' | 'right'>('left');
  const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Character selection state
  const [leftCharacterSelectOpen, setLeftCharacterSelectOpen] = useState(false);
  const [rightCharacterSelectOpen, setRightCharacterSelectOpen] = useState(false);
  const [leftSelectedCharacter, setLeftSelectedCharacter] = useState<Character | null>(null);
  const [rightSelectedCharacter, setRightSelectedCharacter] = useState<Character | null>(null);

  // Sample characters for selection
  const characters: Character[] = [
    { id: "zeus", name: "Zeus", image: "", bgColor: "bg-gradient-to-br from-blue-500 to-purple-600" },
    { id: "athena", name: "Athena", image: "", bgColor: "bg-gradient-to-br from-teal-400 to-blue-500" },
    { id: "ares", name: "Ares", image: "", bgColor: "bg-gradient-to-br from-red-500 to-orange-500" },
    { id: "apollo", name: "Apollo", image: "", bgColor: "bg-gradient-to-br from-yellow-400 to-orange-500" },
    { id: "hades", name: "Hades", image: "", bgColor: "bg-gradient-to-br from-purple-800 to-gray-900" },
    { id: "poseidon", name: "Poseidon", image: "", bgColor: "bg-gradient-to-br from-blue-400 to-teal-500" },
  ];

  // Sample game cards data with chess pieces
  const gameCards: GameCard[] = [
    {
      id: 1,
      title: "TRADITIONAL:",
      price: "Free",
      bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
      description: "Classic chess set with traditional black pieces featuring Greek mythology",
      chessPieces: [
        { name: "Zeus", description: "The king of the gods, ruler of Mount Olympus and the sky, thunder and lightning.", role: "King" },
        { name: "Hera", description: "Queen of the gods and goddess of marriage, women, childbirth, and family.", role: "Queen" },
        { name: "Ares", description: "God of war, bloodshed, and violence. Represents the brutal and untamed aspects of war.", role: "Rook" },
        { name: "Athena", description: "Goddess of wisdom, courage, inspiration, civilization, law and justice, strategic warfare.", role: "Bishop" },
        { name: "Hermes", description: "God of boundaries, travel, communication, trade, language, and writing.", role: "Knight" },
        { name: "Apollo", description: "God of music, arts, knowledge, healing, plague, prophecy, poetry, manly beauty, and archery.", role: "Pawn" }
      ]
    },
    {
      id: 2,
      title: "TRADITIONAL:",
      price: "Free",
      bgColor: "bg-gradient-to-br from-gray-200 to-gray-400",
      description: "Elegant chess set with pristine white pieces featuring Norse mythology",
      chessPieces: [
        { name: "Odin", description: "The Allfather of the gods and the ruler of Asgard. Associated with wisdom, healing, death, royalty, and poetry.", role: "King" },
        { name: "Frigg", description: "The wife of Odin and the queen of Asgard. Goddess of foresight and wisdom.", role: "Queen" },
        { name: "Thor", description: "God of thunder, lightning, storms, oak trees, strength, hallowing, and fertility.", role: "Rook" },
        { name: "Heimdall", description: "The ever-vigilant guardian of the Bifröst, the rainbow bridge that connects Midgard to Asgard.", role: "Bishop" },
        { name: "Loki", description: "A cunning trickster who can shape-shift. Although Loki is the father of many monsters, he helped the gods on many occasions.", role: "Knight" },
        { name: "Valkyrie", description: "Female figures who choose those who may die in battle and those who may live.", role: "Pawn" }
      ]
    },
    {
      id: 3,
      title: "JACKED",
      titleImage: "/cardtitles/black.png", // Using existing image, should be replaced with jacked.png when available
      price: "£5.99",
      bgColor: "bg-gradient-to-br from-amber-500 to-red-600",
      description: "High-energy chess set with powerful muscular pieces featuring Egyptian mythology",
      chessPieces: [
        { name: "Ra", description: "The sun god and creator of all life. One of the most important deities in ancient Egyptian religion.", role: "King" },
        { name: "Isis", description: "Goddess of magic, healing, and protection. Wife and sister of Osiris and mother of Horus.", role: "Queen" },
        { name: "Horus", description: "God of the sky, war and hunting. Often depicted as a falcon or as a man with a falcon head.", role: "Rook" },
        { name: "Thoth", description: "God of wisdom, writing, hieroglyphs, science, magic, art, and judgment.", role: "Bishop" },
        { name: "Anubis", description: "God of mummification and the afterlife. Depicted as a jackal-headed man.", role: "Knight" },
        { name: "Bastet", description: "Goddess of home, fertility, childbirth, women's secrets and cats.", role: "Pawn" }
      ]
    },
    {
      id: 4,
      title: "DIVINE",
      titleImage: "/cardtitles/black.png", // Using existing image, should be replaced with divine.png when available
      price: "£7.99",
      bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600",
      description: "Mystical chess set with divine pieces featuring Hindu mythology",
      chessPieces: [
        { name: "Brahma", description: "The creator god in Hinduism, responsible for the creation of the universe and all beings.", role: "King" },
        { name: "Saraswati", description: "The goddess of knowledge, music, art, wisdom, and learning. Consort of Brahma.", role: "Queen" },
        { name: "Vishnu", description: "The preserver god who protects the universe from being destroyed and restores dharma.", role: "Rook" },
        { name: "Shiva", description: "The destroyer god who destroys in order to recreate, bringing about change in the universe.", role: "Bishop" },
        { name: "Ganesha", description: "The elephant-headed god of beginnings, remover of obstacles, patron of arts and sciences.", role: "Knight" },
        { name: "Indra", description: "The king of the heavens, god of rain, lightning, and thunder. Wields the thunderbolt Vajra.", role: "Pawn" }
      ]
    }
  ];

  const handleCardClick = (card: GameCard) => {
    setSelectedCard(card);
    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#1f2029] text-white">
      {/* Main container */}
      <div className="flex flex-col md:flex-row w-full h-screen">
        
        {/* Title - CHESS 2 */}
        <div className="absolute top-4 left-4 z-10">
          <h1 className="text-3xl font-bold text-white">CHESS 2</h1>
        </div>
        
        {/* Left side - Game modes */}
        <div className="flex flex-col w-full md:w-1/3 h-full justify-center items-center md:items-start md:pl-16 space-y-20 p-8">
          {/* Local Play section */}
          <div className="space-y-6 w-full flex flex-col items-center md:items-start">
            <h1 className="text-6xl font-bold text-white text-center md:text-left">Local play</h1>
            
            <div className="flex items-center justify-center md:justify-start space-x-22">
              <Button
                variant="outline"
                className={cn(
                  "w-14 h-14 p-0 rounded-md border-2 flex items-center justify-center",
                  selectedMode === 'local' 
                    ? "border-blue-400 bg-blue-400/10" 
                    : "border-gray-600 bg-transparent hover:bg-blue-400/5"
                )}
                onClick={() => {
                  setSelectedMode('local');
                  setSelectedLocalSide('left');
                  setLeftCharacterSelectOpen(true);
                }}
              >
                {leftSelectedCharacter ? (
                  <div 
                    className={`w-10 h-10 rounded-full ${leftSelectedCharacter.bgColor} flex items-center justify-center text-xs font-bold`}
                  >
                    {leftSelectedCharacter.name.substring(0, 1)}
                  </div>
                ) : (
                  selectedMode === 'local' && selectedLocalSide === 'left' && (
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  )
                )}
              </Button>
              <span className="text-5xl font-medium">vs</span>
              <Button
                variant="outline"
                className={cn(
                  "w-14 h-14 p-0 rounded-md border-2 flex items-center justify-center",
                  selectedMode === 'local' 
                    ? "border-blue-400 bg-blue-400/10" 
                    : "border-gray-600 bg-transparent hover:bg-blue-400/5"
                )}
                onClick={() => {
                  setSelectedMode('local');
                  setSelectedLocalSide('right');
                  setRightCharacterSelectOpen(true);
                }}
              >
                {rightSelectedCharacter ? (
                  <div 
                    className={`w-10 h-10 rounded-full ${rightSelectedCharacter.bgColor} flex items-center justify-center text-xs font-bold`}
                  >
                    {rightSelectedCharacter.name.substring(0, 1)}
                  </div>
                ) : (
                  selectedMode === 'local' && selectedLocalSide === 'right' && (
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  )
                )}
              </Button>
            </div>
          </div>

          {/* Multiplayer section */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold text-white">Multiplayer</h1>
            
            <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-6">
                <Button
                  variant="outline"
                  className={cn(
                    "w-14 h-14 p-0 rounded-md border-2 flex items-center justify-center",
                    selectedMode === 'multiplayer' && selectedMultiplayerOption === 'random'
                      ? "border-blue-400 bg-blue-400/10" 
                      : "border-gray-600 bg-transparent hover:bg-blue-400/5"
                  )}
                  onClick={() => {
                    setSelectedMode('multiplayer');
                    setSelectedMultiplayerOption('random');
                  }}
                >
                  {selectedMode === 'multiplayer' && selectedMultiplayerOption === 'random' && (
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  )}
                </Button>
                <span className="text-5xl font-medium">random</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <Button
                  variant="outline"
                  className={cn(
                    "w-14 h-14 p-0 rounded-md border-2 flex items-center justify-center",
                    selectedMode === 'multiplayer' && selectedMultiplayerOption === 'private'
                      ? "border-blue-400 bg-blue-400/10" 
                      : "border-gray-600 bg-transparent hover:bg-blue-400/5"
                  )}
                  onClick={() => {
                    setSelectedMode('multiplayer');
                    setSelectedMultiplayerOption('private');
                  }}
                >
                  {selectedMode === 'multiplayer' && selectedMultiplayerOption === 'private' && (
                    <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  )}
                </Button>
                <span className="text-5xl font-medium">private</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Game cards */}
        <div className="w-full md:w-2/3 h-full overflow-y-auto py-8 pr-8 pl-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {gameCards.map((card) => (
            <Card
              key={card.id}
              className="flex flex-col bg-[#2a2c3b] border-none rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              onClick={() => handleCardClick(card)}
            >
              {/* Top image section */}
              <div className={`h-64 ${card.bgColor} relative overflow-hidden`}>
                {/* Game card image */}
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={card.id === 1 ? "/cardimages/black.png" : card.id === 2 ? "/cardimages/white.png" : card.id === 3 ? "/cardimages/jacked.png" : "/cardimages/divine.png"} 
                    alt={card.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Bottom title and purchase section */}
              <div className="p-6 bg-[#2a2c3b]">
                <div className="flex justify-between items-center">
                  {/* Title */}
                  {card.titleImage ? (
                    <div className="h-12">
                      <img 
                        src={card.titleImage} 
                        alt={card.title}
                        className="h-full object-contain"
                      />
                    </div>
                  ) : (
                    <h2 className="text-6xl font-bold text-[#FFFFFF]">{card.title}</h2>
                  )}
                  
                  {/* Price and cart button */}
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-semibold text-white">{card.price}</div>
                    <Button 
                      variant="ghost" 
                      className="bg-[#4a4c5b] hover:bg-[#5a5c6b] rounded-lg p-2 transition-all duration-200 transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Add ${card.title} to cart for ${card.price}`);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Card Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#2a2c3b] text-white border-none w-[90vw] max-w-[1600px] h-[90vh] p-0 m-0 rounded-xl overflow-hidden">
          {selectedCard && (
            <div className="flex flex-col h-full">
              {/* Card header with large image */}
              <div className={`h-1/3 ${selectedCard.bgColor} rounded-t-xl overflow-hidden`}>
                {/* Game card image */}
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={selectedCard.id === 1 ? "/cardimages/black.png" : selectedCard.id === 2 ? "/cardimages/white.png" : selectedCard.id === 3 ? "/cardimages/jacked.png" : "/cardimages/divine.png"} 
                    alt={selectedCard.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Card title and description */}
              <div className="p-8 flex-grow overflow-y-auto">
                <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
                  {selectedCard.titleImage ? (
                    <div className="h-16">
                      <img 
                        src={selectedCard.titleImage} 
                        alt={selectedCard.title}
                        className="h-full object-contain"
                      />
                    </div>
                  ) : (
                    <h2 className="text-7xl font-bold text-[#8ebed3]">{selectedCard.title}</h2>
                  )}
                  <div className="text-3xl font-semibold text-white">{selectedCard.price}</div>
                </div>
                
                <div className="max-w-7xl mx-auto">
                  <p className="text-xl mb-8">{selectedCard.description}</p>
                  
                  {/* Chess pieces section */}
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-white">Chess Pieces</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {selectedCard.chessPieces.map((piece, index) => (
                        <div key={index} className="bg-[#1f2029] p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-2xl font-bold text-[#8ebed3]">{piece.name}</h4>
                            <span className="text-sm bg-[#4a4c5b] px-3 py-1 rounded-full">{piece.role}</span>
                          </div>
                          <p className="text-gray-300">{piece.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Purchase button */}
                  <div className="mt-8 flex justify-end">
                    <Button 
                      variant="default" 
                      className="bg-[#4a4c5b] hover:bg-[#5a5c6b] rounded-lg px-8 py-4 text-xl"
                      onClick={() => alert(`Purchase ${selectedCard.title} for ${selectedCard.price}`)}
                    >
                      <span className="mr-2">Add to Cart</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Character Selection Dialogs */}
      <CharacterSelection 
        characters={characters}
        onSelect={setLeftSelectedCharacter}
        open={leftCharacterSelectOpen}
        onOpenChange={setLeftCharacterSelectOpen}
        side="left"
      />

      <CharacterSelection 
        characters={characters}
        onSelect={setRightSelectedCharacter}
        open={rightCharacterSelectOpen}
        onOpenChange={setRightCharacterSelectOpen}
        side="right"
      />
    </div>
  );
}
