class Api::V1::WormsController < ApplicationController
    skip_before_action :require_token, :verify_authenticity_token, :only => [:create, :add_to_user]
    protect_from_forgery with: :null_session
    def index
        @worms = Worm.order(created_at: :asc)
        @worms_copy = []
        if @worms.length > 0
            @worms.each do |worm|
                user = {
                    user_id: worm.user_id,
                    username: User.find(worm.user_id).username
                } 
                @worm_hold = {id:"", user_id: "", user_obj: {user_id: "", username: ""}, favorited_by: "", created_at: "", data_url: "", name: ""}
                @worm_hold[:id] = worm.id
                @worm_hold[:user_id] = worm.user_id
                @worm_hold[:user_obj] = user
                @worm_hold[:favorited_by] = worm.favorited_by
                @worm_hold[:created_at] = worm.created_at
                @worm_hold[:data_url] = worm.data_url
                @worm_hold[:name] = worm.name
                @worms_copy.push(@worm_hold)
            
            end
            render json: {
                worms: @worms_copy,
                status: 200,
                message: "here's the worms"
            }
        else
            render json: {
                status: 500,
                message: "there's been an issue"
            }
        end
    end
    def show
        @worm = Worm.find_by(:name, worm_params[:name])
    end
    def update
    end
    def new
        @worm = Worm.new(worm_params)
    end
    def favorite_for_user
        @worm = Worm.find_by_id(worm_params[:id])
        if(@worm.favorited_by_user(worm_params[:favorited_by], worm_params[:id]))
            worm2 = Worm.find_by_id(worm_params[:id])
            render json: {
                worm: worm2,
                message: "SUCCESS",
                status: 205
            }
        else
            render json: {message: 'there was an issue favoriting that worm :/', status: 500}
        end
    end
    def unfavorite_for_user
        @worm = Worm.find_by_id(worm_params[:id])
        if(@worm.unfavorited_by_user(worm_params[:favorited_by], worm_params[:id]))
            worm2 = Worm.find_by_id(worm_params[:id])
            render json: {
                worm: worm2,
                message: 'SUCCESS',
                status: 205
            }
        else
            render json: {
                message: 'there was an issue unfavoriting that worm :/', 
                status: 500
            }
        end
    end
    def create
        respond_to :html, :json, :xml
        @worm = Worm.new(worm_params)
        # if worm_params[:image]
        #     @worm.image.attach(worm_params[:image])
        # end
        if @worm.save && @worm.add_to_user(worm_params[:user_id])
            render json: @worm
        else
            render json: {message: 'worm creation/association FAIL (X)~(X)'}
        end
    end
    private
        def worm_params
            params.permit(:name, :user_id, :data_url, :public, :favorited_by, :id)
        end
end