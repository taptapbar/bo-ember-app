class BigObjectViewsController < ApplicationController
  def index
    render json: {
      'big_object_views' => [
        { 
          'id' => '1',
          'title' => 'Graph'
        },
        { 
          'id' => '2',
          'title' => 'Graph 2'
        }
      ]
    }
  end
  
  def show
    render json: {
      'big_object_view' => {
        'title' => 'Graph'
      }
    }
  end
end