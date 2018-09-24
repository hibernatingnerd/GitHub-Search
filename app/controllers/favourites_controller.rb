class FavouritesController < ApplicationController
  def index
    @list = Favourite.all
  end

  def new
    @entry = Favourite.new
  end

  def create
    @entry = Favourite.new

    @entry.name = params[:favourites][:name]
    @entry.language = params[:favourites][:language]


    @entry.save

  end


  def destroy
    @blowup = Favourite.find(params[:id])
    @blowup.destroy

    redirect_to favourites_path
  end
end
